import React from "react";
import { BoxButtonText, Container, Spinner } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function BoxButton({ title, isLoading = false, ...rest }: Props) {
  return (
    <Container disabled={isLoading} activeOpacity={0.7} {...rest}>
      {isLoading ? <Spinner /> : <BoxButtonText>{title}</BoxButtonText>}
    </Container>
  );
}
