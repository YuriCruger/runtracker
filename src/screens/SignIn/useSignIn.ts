import { useState } from "react";
import { Alert } from "react-native";

import { Credentials } from "realm";

import { useApp } from "@realm/react";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export function useSignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const { idToken } = await GoogleSignin.signIn();

      if (idToken) {
        const credentials = Credentials.jwt(idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possível conectar-se a sua conta google."
        );
        setIsAuthenticating(false);
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const errorCode = (error as { code: number }).code;
        if (String(errorCode) === statusCodes.SIGN_IN_CANCELLED) {
          setIsAuthenticating(false);
        } else {
          console.log(error);
          Alert.alert(
            "Entrar",
            "Não foi possível conectar-se a sua conta google."
          );
          setIsAuthenticating(false);
        }
      } else {
        console.log(error);
        Alert.alert("Entrar", "Ocorreu um erro desconhecido.");
        setIsAuthenticating(false);
      }
    }
  }

  return { handleGoogleSignIn, isAuthenticating };
}
