import React from "react";

import { Container, StatsContent } from "./styles";

import { StatsCard, Separator, Header, RoundButton, Map } from "@/components";

import { useRunSummary } from "./useRunSummary";

export function RunSummary() {
  const {
    handlePostRun,
    handleDeleteRun,
    isPosting,
    runCoordinates,
    runDetails,
  } = useRunSummary();

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
              title="ritmo médio (/km)"
              statistic={runDetails.pace}
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
