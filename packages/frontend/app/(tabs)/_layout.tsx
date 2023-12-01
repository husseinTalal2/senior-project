import { Tabs, useRouter } from "expo-router";
import House from "phosphor-react-native/src/icons/House";
import Bag from "phosphor-react-native/src/icons/Bag";
import User from "phosphor-react-native/src/icons/User";
import useTheme from "../../utils/hooks/useTheme";
import { View } from "react-native";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { UserCircle, Calendar } from "phosphor-react-native";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 8 },
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="Reservations"
        options={{
          title: "Reservations",
          tabBarIcon: ({ color, focused }) => (
            <Calendar weight={focused ? "fill" : "thin"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <House weight={focused ? "fill" : "thin"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User weight={focused ? "fill" : "thin"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
