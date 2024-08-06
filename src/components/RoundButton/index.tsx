import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, TouchableOpacity, ButtonText } from "./styles";

import { IconProps } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

export type IconButtonProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  title?: string;
  icon?: IconButtonProps;
};

export function RoundButton({ icon: Icon, title, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <TouchableOpacity {...rest}>
        {title && <ButtonText>{title}</ButtonText>}
        {Icon && <Icon color={COLORS.WHITE} weight="fill" size={32} />}
      </TouchableOpacity>
    </Container>
  );
}
