import { Tabs, router, useRouter } from "expo-router";
import House from "phosphor-react-native/src/icons/House";
import Bag from "phosphor-react-native/src/icons/Bag";
import User from "phosphor-react-native/src/icons/User";
import useTheme from "../../utils/hooks/useTheme";
import { ActivityIndicator, View } from "react-native";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { UserCircle, Calendar } from "phosphor-react-native";
import { useUser } from "../../utils/hooks/useUser";
import { supabase } from "../../lib/supabase";

export default function TabLayout() {
  const theme = useTheme();
  supabase.auth.getSession().then((res) => {
    if (!res.data.session?.user) router.replace("/Signin");
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 8 },
        tabBarActiveTintColor: theme.colors.shade02,
        tabBarLabelStyle: theme.fonts.body["12pt_regular"],
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
