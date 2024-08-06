import React from "react";
import { Container, DirectionProps } from "./styles";

type Props = {
  direction?: DirectionProps;
};

export function Separator({ direction = "HORIZONTAL" }: Props) {
  return <Container direction={direction} />;
}
