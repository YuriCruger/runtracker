import "react-native-get-random-values";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AppProvider, UserProvider } from "@realm/react";

import { Loading } from "@/components/Loading";

import { RealmProvider, syncConfig } from "@/libs/realm";

import { SignIn } from "@/screens/SignIn";

import { REALM_APP_ID } from "@env";

import { Routes } from "@/routes";

import { theme } from "@/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar
              barStyle={"light-content"}
              backgroundColor={theme.COLORS.GRAY_700}
            />
            <UserProvider fallback={SignIn}>
              <RealmProvider sync={syncConfig} fallback={Loading}>
                {fontsLoaded ? <Routes /> : <Loading />}
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AppProvider>
  );
}
