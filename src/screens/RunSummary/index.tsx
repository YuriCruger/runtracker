import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { LatLng } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Container, StatsContent } from "./styles";
import { StatsCard } from "@/components/StatsCard";
import { Separator } from "@/components/Separator";
import { Header } from "@/components/Header";
import { RoundButton } from "@/components/RoundButton";
import { Map } from "@/components/Map";
import { useUser } from "@realm/react";
import { useRealm } from "@/libs/realm";
import { Historic } from "@/libs/realm/schemas/Historic";
import {
  storageLocationsDelete,
  storageLocationsGet,
} from "@/libs/storage/storage-location";
import {
  storageRunDetailsDelete,
  storageRunDetailsGet,
  Details,
} from "@/libs/storage/storage-run-details";
import { getCityAndStateFromCoordinates } from "@/utils/getCityAndStateFromCoordinates";
import { LocationSchemaProps } from "@/libs/realm/schemas/Location";
import { calculateMaxSpeed } from "@/utils/calculateMaxSpeed";

type RunDetailsProps = {
  maxSpeed: string;
  distance: string;
  pace: string;
  elapsedTime: string;
};

export function RunSummary() {
  const [runCoordinates, setRunCoordinates] = useState<LatLng[]>([]);
  const [runDetails, setRunDetails] = useState<RunDetailsProps | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [location, setLocation] = useState<LocationSchemaProps | null>(null);

  const navigation = useNavigation();
  const realm = useRealm();
  const user = useUser();

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

      await storageLocationsDelete();
      await storageRunDetailsDelete();

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

      const maxSpeed = calculateMaxSpeed(locationsStorage);

      const detailsStorage = await storageRunDetailsGet();

      const formatRunDetails = {
        maxSpeed,
        distance: detailsStorage.distance,
        elapsedTime: detailsStorage.elapsedTime,
        pace: detailsStorage.pace,
      };

      setRunDetails(formatRunDetails);
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

  return (
    <Container>
      <Header
        pageTitle="Corrida"
        buttonText="apagar"
        handlePress={() => handleDeleteRun()}
      />

      {runCoordinates.length > 0 && <Map coordinates={runCoordinates} />}

      {runDetails && (
        <>
          <StatsContent>
            <StatsCard
              title="tempo"
              statistic={runDetails.elapsedTime}
              hideUnityLabel
              size="SMALL"
            />

            <Separator direction="VERTICAL" />

            <StatsCard
              title="distância (km)"
              statistic={runDetails.distance}
              hideUnityLabel
              size="SMALL"
            />
          </StatsContent>

          <Separator />

          <StatsContent>
            <StatsCard
              title="ritmo médio (/km)"
              statistic={runDetails.pace}
              hideUnityLabel
              size="SMALL"
            />

            <Separator direction="VERTICAL" />

            <StatsCard
              title="Velocidade máx (km/h)"
              statistic={runDetails.maxSpeed}
              hideUnityLabel
              size="SMALL"
            />
          </StatsContent>
        </>
      )}

      <RoundButton
        title="Concluir"
        onPress={handlePostRun}
        disabled={isPosting}
      />
    </Container>
  );
}
