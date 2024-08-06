import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { LatLng } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Container, MapSkeleton, StatsContent } from "./styles";
import { Stop } from "phosphor-react-native";
import {
  useForegroundPermissions,
  useBackgroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
} from "expo-location";
import {
  startLocationTask,
  stopLocationTask,
} from "@/tasks/backgroundLocationTasks";
import { storageRunDetailsSave } from "@/libs/storage/storage-run-details";
import { calculateTotalDistance } from "@/utils/calculateTotalDistance";
import { calculatePacePerKm } from "@/utils/calculatePace";
import { formatPace } from "@/utils/formatPace";
import { Separator } from "@/components/Separator";
import { StatsCard } from "@/components/StatsCard";
import { Loading } from "@/components/Loading";
import { RoundButton } from "@/components/RoundButton";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";

export function RunStart() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [status, requestPermission] = useBackgroundPermissions();

  const navigation = useNavigation();

  const totalDistance = calculateTotalDistance(coordinates);
  const pace = calculatePacePerKm(elapsedTime, totalDistance);

  const elapsedTimeFormatted = `${Math.floor(elapsedTime / 60)}:${Math.floor(
    elapsedTime % 60
  )
    .toString()
    .padStart(2, "0")}`;

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

    await startLocationTask();

    const storedStartTime = Date.now();
    setStartTime(storedStartTime);
  }

  async function handleStopRun() {
    setIsStarted(false);
    await stopLocationTask();

    const details = {
      elapsedTime: elapsedTimeFormatted,
      distance: totalDistance.toFixed(2),
      pace: formatPace(pace),
    };

    try {
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

  return (
    <Container>
      {isStarted && coordinates.length > 0 ? (
        <StatsContent>
          <StatsCard
            title="tempo"
            statistic={elapsedTimeFormatted}
            hideUnityLabel
          />
          <Separator />
          <StatsCard
            title="ritmo médio da parcial"
            statistic={formatPace(pace)}
          />
          <Separator />
          <StatsCard title="distância" statistic={totalDistance.toFixed(2)} />
        </StatsContent>
      ) : (
        <>
          <Header
            pageTitle="Corrida"
            buttonText="voltar"
            handlePress={() => navigation.goBack()}
          />
          {isLoadingLocation ? (
            <Loading />
          ) : (
            <Map coordinates={coordinates} hasStarted={isStarted} />
          )}
        </>
      )}

      {isStarted ? (
        <RoundButton onPress={handleStopRun} icon={Stop} />
      ) : (
        <RoundButton
          onPress={handleStartRun}
          title="Iniciar"
          disabled={isLoadingLocation}
        />
      )}
    </Container>
  );
}
