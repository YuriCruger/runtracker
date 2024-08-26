import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { LatLng } from "react-native-maps";

import { useNavigation } from "@react-navigation/native";

import {
  Historic,
  LocationSchemaProps,
  storageLocationsDelete,
  storageLocationsGet,
  storageRunDetailsDelete,
  storageRunDetailsGet,
  useRealm,
  RunDetails,
} from "@/libs";

import { getCityAndStateFromCoordinates } from "@/utils";

import { useUser } from "@realm/react";

export function useRunSummary() {
  const [isPosting, setIsPosting] = useState(false);
  const [runDetails, setRunDetails] = useState<RunDetails | null>(null);
  const [runCoordinates, setRunCoordinates] = useState<LatLng[]>([]);
  const [location, setLocation] = useState<LocationSchemaProps | null>(null);
  const navigation = useNavigation();
  const realm = useRealm();
  const user = useUser();

  async function clearStorage() {
    await storageRunDetailsDelete();
    await storageLocationsDelete();
  }

  async function handlePostRun() {
    try {
      if (!runDetails || !location) {
        return;
      }

      setIsPosting(true);

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            user_id: user.id,
            run_distance: runDetails.distance,
            run_pace: runDetails.pace,
            run_time: runDetails.elapsedTime,
            location: {
              city: location.city,
              state: location.state,
            },
            coords: runCoordinates,
          })
        );
      });

      await clearStorage();

      navigation.navigate("home");
    } catch (error) {
      console.error(error);
      setIsPosting(false);

      Alert.alert(
        "Erro",
        "Não possível registrar a corrida. Por favor tente novamente mais tarde."
      );
    }
  }

  function handleDeleteRun() {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar a corrida?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Sim", onPress: () => deleteRun() },
      ],
      { cancelable: false }
    );
  }

  async function deleteRun() {
    await storageLocationsDelete();
    await storageRunDetailsDelete();
    navigation.navigate("home");
  }

  useEffect(() => {
    async function loadRunData() {
      const locationsStorage = await storageLocationsGet();
      setRunCoordinates(locationsStorage);

      const detailsStorage = await storageRunDetailsGet();

      setRunDetails(detailsStorage);
    }

    loadRunData();
  }, []);

  useEffect(() => {
    async function fetchCityAndState() {
      if (runCoordinates.length > 0) {
        const locationData = await getCityAndStateFromCoordinates(
          runCoordinates[0]
        );
        setLocation(locationData);
      }
    }

    fetchCityAndState();
  }, [runCoordinates]);

  return {
    handlePostRun,
    handleDeleteRun,
    runCoordinates,
    runDetails,
    isPosting,
  };
}
