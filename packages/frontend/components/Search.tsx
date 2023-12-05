// SearchInput.tsx
import { Sliders } from "phosphor-react-native";
import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import { Theme } from "../constants/Theme";
import useTheme from "../utils/hooks/useTheme";

interface SearchInputProps {
  placeholder: string;
  setSearchQuery: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  setSearchQuery,
}) => {
  const theme = useTheme();
  return (
    <View style={styles(theme).container}>
      <TextInput
        style={styles(theme).input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onChange={(e) => {
          setSearchQuery(e.nativeEvent.text);
        }}
      />
      <Sliders color="#888" weight="thin" size={20} />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      borderRadius: 25,
      marginTop: theme.spacing.lg,
      backgroundColor: "#fff",
      paddingHorizontal: theme.spacing["2xl"],
      marginHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      ...Platform.select({
        android: {
          elevation: 3,
        },
        ios: {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
        },
      }),
    },
    input: {
      ...theme.fonts.body["16pt_regular"],
      color: theme.colors.shade02,
      flex: 1,
    },
    iconContainer: {
      marginLeft: 10,
    },
  });

export default SearchInput;
