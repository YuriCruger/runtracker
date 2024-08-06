import React from "react";
import { Container, StatName, StatValue } from "./styles";

type Props = {
  statName: string;
  statValue: string;
};

export function StatItem({ statName, statValue }: Props) {
  return (
    <Container>
      <StatName>{statName}</StatName>
      <StatValue>{statValue}</StatValue>
    </Container>
  );
}
