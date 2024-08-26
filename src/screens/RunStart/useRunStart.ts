import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { LatLng } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import {
  LocationAccuracy,
  LocationSubscription,
  useBackgroundPermissions,
  useForegroundPermissions,
  watchPositionAsync,
} from "expo-location";

import {
  startLocationTask,
  stopLocationTask,
} from "@/tasks/backgroundLocationTasks";

import {
  calculatePacePerKm,
  calculateTotalDistance,
  formatPace,
} from "@/utils";

import {
  storageLocationsDelete,
  storageRunDetailsDelete,
  storageRunDetailsSave,
} from "@/libs";

export function useRunStart() {
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const navigation = useNavigation();

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [status, requestPermission] = useBackgroundPermissions();

  const totalDistance = calculateTotalDistance(coordinates);
  const pace = calculatePacePerKm(elapsedTime, totalDistance);

  const elapsedTimeFormatted = `${Math.floor(elapsedTime / 60)}:${Math.floor(
    elapsedTime % 60
  )
    .toString()
    .padStart(2, "0")}`;

  async function clearStorage() {
    await storageRunDetailsDelete();
    await storageLocationsDelete();
  }

  async function handleStartRun() {
    if (coordinates.length <= 0) {
      return Alert.alert(
        "Localização",
        "Não foi possível obter a localização atual. Tente novamente."
      );
    }

    if (!status?.granted) {
      return Alert.alert(
        "Localização",
        'É necessário permitir que o App tenha acesso à localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."'
      );
    }

    setIsStarted(true);

    await clearStorage();

    await startLocationTask();

    const storedStartTime = Date.now();
    setStartTime(storedStartTime);
  }

  async function handleStopRun() {
    try {
      setIsStarted(false);

      const details = {
        elapsedTime: elapsedTimeFormatted,
        distance: totalDistance.toFixed(2),
        pace: formatPace(pace),
      };

      await stopLocationTask();
      await storageRunDetailsSave(details);
      navigation.navigate("runSummary");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os detalhes da corrida.");
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission();
    requestPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
      },
      (location) => {
        if (isStarted) {
          setCoordinates((prevCoords) => [
            ...prevCoords,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]);
        } else {
          setCoordinates([
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]);
        }

        setIsLoadingLocation(false);
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted, isStarted]);

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = (currentTime - startTime) / 1000; // Time in seconds
        setElapsedTime(timeElapsed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  return {
    coordinates,
    isStarted,
    handleStartRun,
    handleStopRun,
    isLoadingLocation,
    elapsedTimeFormatted,
    totalDistance,
    pace,
  };
}
