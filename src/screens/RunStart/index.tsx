import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, StatsContent } from "./styles";

import { Stop } from "phosphor-react-native";

import { formatPace } from "@/utils";

import {
  Separator,
  StatsCard,
  Loading,
  RoundButton,
  Header,
  Map,
} from "@/components";

import { useRunStart } from "./useRunStart";

export function RunStart() {
  const {
    coordinates,
    handleStartRun,
    isStarted,
    handleStopRun,
    isLoadingLocation,
    elapsedTimeFormatted,
    totalDistance,
    pace,
  } = useRunStart();

  const navigation = useNavigation();

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
