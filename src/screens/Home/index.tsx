import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

import { Container, Message } from "./styles";

import {
  useForegroundPermissions,
  useBackgroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
} from "expo-location";
import { Map } from "@/components/Map";
import { LatLng } from "react-native-maps";
import { storageRunDelete, storageRunSave } from "@/libs/storage/storage-run";
import { startLocationTask } from "@/tasks/backgroundLocationTasks";

export function Home() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentCoords, setCurrentCoords] = useState<LatLng | null>(null);
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [status, requestPermission] = useBackgroundPermissions();

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
        setCurrentCoords(location.coords);
        setIsLoadingLocation(false);
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted]);

  async function handleStartRun() {
    if (!currentCoords?.latitude && !currentCoords?.longitude) {
      return Alert.alert(
        "Localização",
        "Não foi possível obter a localização atual. Tente novamente."
      );
    }

    if (!status?.granted) {
      return Alert.alert(
        "Localização",
        'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."'
      );
    }
    console.log(status);
    await startLocationTask();
  }

  async function handleStopRun() {
    if (!currentCoords?.latitude && !currentCoords?.longitude) {
      return Alert.alert(
        "Localização",
        "Não foi possível obter a localização atual. Tente novamente."
      );
    }

    await storageRunSave({
      coords: [
        {
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
          timestamp: new Date().getTime(),
        },
      ],
    });
  }

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          acessar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder a permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  if (isLoadingLocation) {
    <Message>Carregando.</Message>;
  }

  return (
    <Container>
      {currentCoords && <Map coordinates={[currentCoords]} />}

      <TouchableOpacity
        onPress={handleStartRun}
        style={{
          backgroundColor: "orange",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
        }}
      >
        <Text>Iniciar corrida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleStopRun}
        style={{
          backgroundColor: "red",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
        }}
      >
        <Text>Finalizar corrida</Text>
      </TouchableOpacity>
    </Container>
  );
}
