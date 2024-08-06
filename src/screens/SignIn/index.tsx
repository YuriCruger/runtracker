import { useState } from "react";
import { Alert } from "react-native";

import { Container, Title, Description } from "./styles";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

import { Credentials } from "realm";
import { useApp } from "@realm/react";

import backgroundImg from "@/assets/background.jpg";
import { BoxButton } from "@/components/BoxButton";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
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

  return (
    <Container source={backgroundImg}>
      <Title>Bem-vindo ao Run Tracker!</Title>

      <Description>
        O seu companheiro ideal para monitorar e melhorar suas corridas.
      </Description>

      <BoxButton
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
        title="Entrar com o Google"
      />
    </Container>
  );
}
