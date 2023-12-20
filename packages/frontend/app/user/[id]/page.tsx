import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { router, useGlobalSearchParams } from "expo-router";
import { api } from "../../../utils/trpc";
import useTheme from "../../../utils/hooks/useTheme";

function UserProfile() {
  const params = useGlobalSearchParams<{ id: string }>();
  console.log({ params });

  const user = api.user.getById.useQuery({
    id: params.id,
  });
  const theme = useTheme();

  if (user.isLoading) {
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

  if (user.data) {
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <SafeAreaView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 48,
            }}
          >
            <Image
              source={{ uri: user.data.avatar ? user.data.avatar : undefined }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 90,
              }}
            />
            <Text style={theme.fonts.header["22pt_semibold"]}>
              {user.data.name}
            </Text>
            <Text
              style={[
                theme.fonts.body["14pt_regular"],
                { color: theme.colors.shade02 },
              ]}
            >
              teams {user.data.teams.length}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["3xl"],
            }}
          >
            <Text style={theme.fonts.header["22pt_semibold"]}>Teams</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {user.data.teams.map((team) => {
                return (
                  <Pressable
                    onPress={() => {
                      router.push(`/team/${team.id}/page`);
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                      marginTop: theme.spacing.lg,
                      borderRadius: 14,
                      backgroundColor: "#fff",
                      paddingHorizontal: 18,
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
                      source={{ uri: team.logo }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 90,
                      }}
                    />
                    <Text style={theme.fonts.header["22pt_semibold"]}>
                      {team.name}
                    </Text>
                    <Text
                      style={[
                        theme.fonts.body["14pt_regular"],
                        { color: theme.colors.shade02 },
                      ]}
                    >
                      members {team.members.length}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default UserProfile;
