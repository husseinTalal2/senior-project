import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  View,
  Platform,
  Text,
} from "react-native";
import { api } from "../utils/trpc";
import { router } from "expo-router";
import useTheme from "../utils/hooks/useTheme";
import { Image } from "expo-image";
import Button from "../components/Button";
import { useUser } from "../utils/hooks/useUser";

function DiscoverTeams() {
  const teams = api.team.getAll.useQuery();
  const theme = useTheme();
  const { user } = useUser();

  if (teams.isLoading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <MasonryFlashList
        data={teams.data}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={theme.fonts.header["22pt_semibold"]}>
                Discover Teams
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/team/${item.id}/page`);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: theme.spacing.lg,
                borderRadius: 14,
                backgroundColor: "#fff",
                paddingHorizontal: 18,
                margin: 10,
                paddingVertical: 22,
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
              }}
            >
              <Image
                source={{ uri: item.logo }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 90,
                }}
              />
              <Text style={theme.fonts.header["22pt_semibold"]}>
                {item.name}
              </Text>
              <Text
                style={[
                  theme.fonts.body["14pt_regular"],
                  { color: theme.colors.shade02 },
                ]}
              >
                members {item.members.length}
              </Text>
            </Pressable>
          );
        }}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
}

export default DiscoverTeams;
