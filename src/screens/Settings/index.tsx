import React from "react";
import { Container, Text } from "./styles";
import { Alert, Pressable } from "react-native";
import { useApp } from "@realm/react";
import { Header } from "@/components/Header";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const app = useApp();

  const navigation = useNavigation();

  function handleLogOut() {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Não",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Sim",
        style: "default",
        onPress: () => logOut(),
      },
    ]);
  }

  function logOut() {
    app.currentUser?.logOut();
  }

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
