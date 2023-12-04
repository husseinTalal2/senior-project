import React from "react";
import { Dimensions, View } from "react-native";
import useTheme from "../utils/hooks/useTheme";

const WIDTH = Dimensions.get("screen").width;
function Divider() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: WIDTH - theme.spacing["2xl"] * 2,
        height: 2,
        backgroundColor: theme.colors.neutral05,
      }}
    />
  );
}

export default Divider;
