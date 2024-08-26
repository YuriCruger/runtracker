import { Alert } from "react-native";

import { useApp } from "@realm/react";

export function useSettings() {
  const app = useApp();

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

  return { handleLogOut };
}
