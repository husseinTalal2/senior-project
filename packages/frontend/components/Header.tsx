import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../utils/hooks/useTheme";
import { CaretLeft } from "phosphor-react-native";
import { useRouter } from "expo-router";

function Header() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        position: "absolute",
        top: insets.top + theme.spacing.lg,
        left: theme.spacing["2xl"],
        zIndex: 50,
        borderRadius: 100,
        overflow: "hidden",
        padding: theme.spacing.xs,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <CaretLeft weight="bold" size={26} />
      </Pressable>
    </View>
  );
}

export default Header;
