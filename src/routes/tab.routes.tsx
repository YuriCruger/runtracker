import { Alert, View } from "react-native";

import { Home } from "@/screens/Home";
import { Profile } from "@/screens/Profile";

import { useApp } from "@realm/react";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components/native";

import { HouseLine, Record, SignOut, User } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

type TabRoutes = {
  home: undefined;
  record: undefined;
  profile: undefined;
  logout: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  const navigation = useNavigation();

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
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <User size={24} weight="bold" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="logout"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogOut();
          },
        }}
        options={{
          tabBarLabel: "Sair",
          tabBarIcon: ({ color }) => (
            <SignOut size={24} weight="bold" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
