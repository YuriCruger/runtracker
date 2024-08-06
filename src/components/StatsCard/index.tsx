import React from "react";
import { Container, Statistic, Title, UnityLabel, SizeProps } from "./styles";

type Props = {
  title: string;
  statistic: string;
  hideUnityLabel?: boolean;
  size?: SizeProps;
};

export function StatsCard({
  title,
  statistic,
  hideUnityLabel = false,
  size = "NORMAL",
}: Props) {
  return (
    <Container>
      <Title size={size}>{title}</Title>

      <Statistic size={size}>{statistic}</Statistic>

      {!hideUnityLabel && <UnityLabel>/km</UnityLabel>}
    </Container>
  );
}
