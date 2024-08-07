import { View } from "react-native";

import { Home } from "@/screens/Home";
import { Settings } from "@/screens/Settings";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components/native";

import { Gear, HouseLine, Record } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

type TabRoutes = {
  home: undefined;
  record: undefined;
  settings: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.BRAND_LIGHT,
        tabBarInactiveTintColor: COLORS.WHITE,
        tabBarStyle: {
          backgroundColor: COLORS.GRAY_700,
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 10,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.XXS,
          fontFamily: FONT_FAMILY.BOLD,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color }) => (
            <HouseLine size={24} weight="bold" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="record"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("runStart");
          },
        }}
        options={{
          tabBarLabel: "Gravar",
          tabBarIcon: ({ color }) => (
            <Record size={24} weight="bold" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color }) => (
            <Gear size={24} weight="bold" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
