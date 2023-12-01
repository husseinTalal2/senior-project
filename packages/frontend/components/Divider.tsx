import React from "react";
import { View } from "react-native";
import useTheme from "../utils/hooks/useTheme";

function Divider() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: 2,
        backgroundColor: theme.colors.primary,
        opacity: 0.1,
      }}
    ></View>
  );
}

export default Divider;
