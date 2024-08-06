import React from "react";

import {
  ButtonBack,
  ButtonText,
  Container,
  EmptyComponent,
  Page,
} from "./styles";

type Props = {
  pageTitle: string;
  buttonText: string;
  handlePress: () => void;
};

export function Header({ pageTitle, buttonText, handlePress }: Props) {
  return (
    <Container>
      <ButtonBack onPress={handlePress}>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonBack>

      <Page>{pageTitle}</Page>

      <EmptyComponent />
    </Container>
  );
}
