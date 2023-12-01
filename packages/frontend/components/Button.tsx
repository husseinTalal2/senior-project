import React from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import useTheme from "../utils/hooks/useTheme";
import { Theme } from "../constants/Theme";

function Button({
  onPress,
  postfixIcon,
  prefixIcon,
  style,
  text,
  type = "primary",
  disabled,
}: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: disabled
            ? theme.colors.disabled
            : theme.colors[type],
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          opacity: pressed || disabled ? 0.8 : 1,
        },
        style,
      ]}
    >
      {!!prefixIcon && prefixIcon}
      {!!text && (
        <Text style={{ color: theme.colors.textOnColor }}>{text}</Text>
      )}
      {!!postfixIcon && postfixIcon}
    </Pressable>
  );
}

type Props = {
  onPress?: () => void;
  text?: string;
  prefixIcon?: JSX.Element;
  postfixIcon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  type?: keyof Theme["colors"];
  disabled?: boolean;
};
export default Button;
