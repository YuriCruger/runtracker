import { Home } from "@/screens/Home";
import { theme } from "@/theme";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={theme.COLORS.GRAY_800}
        />

        <Home />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
