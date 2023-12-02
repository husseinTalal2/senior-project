import React from "react";
import useTheme from "../utils/hooks/useTheme";
import { Theme } from "../constants/Theme";
import { StyleSheet, Text, View, Platform, Pressable } from "react-native";
import { AppRouter } from "backend";
import { inferRouterOutputs } from "@trpc/server";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

type RouterOutput = inferRouterOutputs<AppRouter>;

function CourtItem({ court }: { court: RouterOutput["court"]["getAll"][0] }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/court/${court.id}`)}
      style={styles(theme).container}
    >
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          borderTopLeftRadius: theme.borderRadius.sm,
          borderTopRightRadius: theme.borderRadius.sm,
        }}
      >
        <Image
          source={{ uri: court.imgs[0] }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>
      <View style={styles(theme).infoContainer}>
        <View style={{ gap: 6 }}>
          <Text
            style={{
              ...theme.fonts.body["14pt_semibold"],
              color: theme.colors.shade02,
            }}
          >
            {court.address}
          </Text>
          <Text
            style={{
              ...theme.fonts.body["12pt_regular"],
              color: theme.colors.neutral08,
            }}
          >
            {court.address}
          </Text>
        </View>
        <View>
          {court.rating && <Text>{court.rating}</Text>}
          <Text
            style={{
              ...theme.fonts.body["14pt_semibold"],
              color: theme.colors.shade02,
            }}
          >
            ${court.pricePerHour} / Hour
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      minHeight: 290,
      overflow: "visible",
      borderRadius: theme.borderRadius.sm,
      marginHorizontal: theme.spacing.md,
      ...Platform.select({
        android: {
          elevation: 3,
        },
        ios: {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }),
    },
    infoContainer: {
      paddingHorizontal: theme.spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.lg,
      minHeight: 78,
    },
    name: {},
    price: {},
  });

type Props = {};
export default CourtItem;
