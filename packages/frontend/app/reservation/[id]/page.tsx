import { CaretLeft, MapPin, Phone } from "phosphor-react-native";
import React from "react";
import {
  Text,
  View,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../../../utils/hooks/useTheme";
import { ScrollView } from "react-native-gesture-handler";
import { router, useGlobalSearchParams } from "expo-router";
import { api } from "../../../utils/trpc";
import { Chip } from "../../../components/ReservationItem";
import Divider from "../../../components/Divider";
import { Image } from "expo-image";
import Map from "../../../components/Map";
import { formatShortDate, formatTime } from "../../../utils/dateUtils";

function Reservation() {
  const theme = useTheme();
  const { id } = useGlobalSearchParams<{ id: string }>();

  const reservation = api.reservation.getById.useQuery({
    id: Number(id),
    userId: "d143d69c-81ba-4dcf-a8f6-7d888294412e",
  });

  console.log(reservation.data);

  if (reservation.isLoading) {
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
  if (reservation.data) {
    return (
      <>
        <Header title="Reservation Details" />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingBottom: theme.spacing["2xl"],
          }}
          contentContainerStyle={{
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["3xl"],
            }}
          >
            <Text style={theme.fonts.header["22pt_semibold"]}>
              {reservation.data.court?.name}
            </Text>
            <View style={{ gap: theme.spacing["2xs"] }}>
              <Text style={theme.fonts.body["18pt_regular"]}>
                {formatTime(reservation.data.from)} -{" "}
                {formatTime(reservation.data.to)}
              </Text>
              <Text style={theme.fonts.body["14pt_regular"]}>
                {formatShortDate(reservation.data.from)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: theme.spacing.sm,
              paddingHorizontal: theme.spacing["2xl"],
              marginVertical: theme.spacing.md,
              flexWrap: "wrap",
              marginBottom: theme.spacing["2xl"],
            }}
          >
            {reservation.data.status?.map((status) => {
              return <Chip status={status} />;
            })}
          </View>
          {/* <Divider />
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["2xl"],
              marginBottom: theme.spacing["2xl"],
            }}
          >
            <Text
              style={[
                theme.fonts.header["22pt_semibold"],
                {
                  marginBottom: theme.spacing["md"],
                },
              ]}
            >
              Players
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  borderWidth: 1,
                  borderRadius: theme.borderRadius.sm,
                  paddingVertical: theme.spacing["md"],
                  paddingHorizontal: theme.spacing["lg"],
                  gap: theme.spacing.md,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 500 }}
                  contentFit="cover"
                  source={{
                    uri: "https://img1.cgtrader.com/items/4506145/4d6ab481d2/large/football-player-avatar-3d-icon-3d-model-4d6ab481d2.jpg",
                  }}
                />
                <Text style={theme.fonts.body["14pt_semibold"]}>
                  Player name
                </Text>
              </View>
            </View>
          </View> */}
          {!!reservation.data.opponentTeam && (
            <>
              <Divider />
              <View
                style={{
                  paddingHorizontal: theme.spacing["2xl"],
                  marginTop: theme.spacing["2xl"],
                  marginBottom: theme.spacing["2xl"],
                }}
              >
                <Text
                  style={[
                    theme.fonts.header["22pt_semibold"],
                    {
                      marginBottom: theme.spacing["md"],
                    },
                  ]}
                >
                  Opponent Team
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderRadius: theme.borderRadius.sm,
                      paddingVertical: theme.spacing["md"],
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: theme.spacing.md,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50, borderRadius: 500 }}
                        contentFit="cover"
                        source={{
                          uri: reservation.data.opponentTeam?.logo,
                        }}
                      />
                      <Text style={theme.fonts.body["14pt_semibold"]}>
                        {reservation.data.opponentTeam?.name}
                      </Text>
                    </View>
                    <Text
                      style={[
                        theme.fonts.body["14pt_semibold"],
                        { color: theme.colors.neutral08 },
                      ]}
                    >
                      {reservation.data.opponentTeam?.members.length} members
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
          <Divider />
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["2xl"],
              paddingBottom: theme.spacing["2xl"],
            }}
          >
            <Text
              style={[
                theme.fonts.header["22pt_semibold"],
                {
                  marginBottom: theme.spacing["md"],
                },
              ]}
            >
              Location Details
            </Text>
            <Map
              location={{
                latitude: reservation.data.court?.location.latitude!,
                longitude: reservation.data.court?.location.longitude!,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.lg,
                alignItems: "center",
                marginVertical: theme.spacing["md"],
              }}
            >
              <Phone weight="thin" size={24} />
              <Text style={theme.fonts.body["16pt_regular"]}>
                {reservation.data.court?.phoneNumber}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.lg,
                alignItems: "center",
              }}
            >
              <MapPin weight="thin" size={24} />
              <Text style={theme.fonts.body["16pt_regular"]}>
                {reservation.data.court?.address}
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={{
        zIndex: 333,
        paddingTop: insets.top,
        paddingBottom: theme.spacing.md,
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",
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
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top,
          left: theme.spacing["lg"],
        }}
      >
        <CaretLeft size={32} weight="thin" />
      </Pressable>
      <Text style={theme.fonts.header["22pt_semibold"]}>{title}</Text>
    </View>
  );
}
export default Reservation;
