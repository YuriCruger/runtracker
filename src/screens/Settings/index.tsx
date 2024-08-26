import React from "react";
import { Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Container, Text } from "./styles";

import { Header } from "@/components";

import { useSettings } from "./useSettings";

export function Settings() {
  const navigation = useNavigation();
  const { handleLogOut } = useSettings();

  return (
    <Container>
      <Header
        buttonText="voltar"
        pageTitle="Configurações"
        handlePress={() => navigation.goBack()}
      />

      <Pressable onPress={handleLogOut}>
        <Text>Sair</Text>
      </Pressable>
    </Container>
  );
}
