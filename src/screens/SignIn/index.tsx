import { Container, Title, Description } from "./styles";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

import backgroundImg from "@/assets/background.jpg";

import { BoxButton } from "@/components";
import { useSignIn } from "./useSignIn";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
  const { handleGoogleSignIn, isAuthenticating } = useSignIn();

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
