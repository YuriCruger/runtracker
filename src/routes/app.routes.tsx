import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RunSummary } from "@/screens/RunSummary";
import { RunStart } from "@/screens/RunStart";

import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabRoutes" component={TabRoutes} />
      <Stack.Screen name="runStart" component={RunStart} />
      <Stack.Screen name="runSummary" component={RunSummary} />
    </Stack.Navigator>
  );
}
