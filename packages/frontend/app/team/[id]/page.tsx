import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../reservation/[id]/page";
import { router, useGlobalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Platform,
} from "react-native";
import useTheme from "../../../utils/hooks/useTheme";
import { api } from "../../../utils/trpc";
import { Image } from "expo-image";
import { Check, X } from "phosphor-react-native";
import Divider from "../../../components/Divider";
import { CourtType } from "../../court/[id]";
import { RouterOutput } from "backend";
import { Chip } from "../../../components/ReservationItem";
import { formatTime } from "../../../utils/dateUtils";
import Button from "../../../components/Button";

function Page() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const theme = useTheme();

  const team = api.team.getTeamById.useQuery({ id: parseInt(id) });

  if (team.isLoading) {
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

  if (team.data) {
    return (
      <>
        <Header title="Team" />
        <ScrollView
          style={{ paddingTop: theme.spacing["3xl"], backgroundColor: "#fff" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
            }}
          >
            <Image
              source={{ uri: team.data.logo }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 90,
              }}
            />
            <Text style={theme.fonts.header["22pt_semibold"]}>
              {team.data.name}
            </Text>
            <Text
              style={[
                theme.fonts.body["14pt_regular"],
                { color: theme.colors.shade02 },
              ]}
            >
              members {team.data.members.length}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["2xl"],
              marginBottom: theme.spacing["2xl"],
            }}
          >
            <Text style={theme.fonts.header["22pt_semibold"]}>Members</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: theme.spacing["2xl"],
              }}
            >
              {team.data.members.map((member) => {
                return (
                  <Pressable
                    onPress={() => router.push(`/user/${member.id}/page`)}
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: member.avatar ? member.avatar : undefined,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                    />
                    <Text style={theme.fonts.body["14pt_semibold"]}>
                      {member.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <Divider />
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["3xl"],
              marginBottom: theme.spacing["3xl"],
            }}
          >
            <Text style={theme.fonts.header["22pt_semibold"]}>
              Join Requests
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: theme.spacing["2xl"],
              }}
            >
              {team.data.joinRequests.map((member) => {
                return (
                  <Pressable
                    onPress={() => router.push(`/user/${member.id}/page`)}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: member.avatar ? member.avatar : undefined,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                      />
                      <Text style={theme.fonts.body["14pt_semibold"]}>
                        {member.name}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <View
                        style={{
                          borderRadius: 50,
                          backgroundColor: theme.colors.success + "17",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <Check
                          weight="thin"
                          size={27}
                          color={theme.colors.success}
                        />
                      </View>
                      <View
                        style={{
                          borderRadius: 50,
                          backgroundColor: theme.colors.error02 + "17",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <X
                          weight="thin"
                          size={27}
                          color={theme.colors.error02}
                        />
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <Divider />
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              marginTop: theme.spacing["3xl"],
            }}
          >
            <Text style={theme.fonts.header["22pt_semibold"]}>
              Reservations
            </Text>
            <View
              style={{
                marginTop: theme.spacing["2xl"],
              }}
            >
              {team.data.awayReservations
                .concat(team.data.homeReservations)
                .map((reservation) => {
                  return <ReservationItem reservation={reservation} />;
                })}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

function ReservationItem({ reservation }: { reservation: any }) {
  const theme = useTheme();
  const handleCancelReservation = () => {};

  return (
    <Pressable
      onPress={() => router.push(`/reservation/${reservation.id}/page`)}
      style={{
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
        backgroundColor: "#fff",
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.lg,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        marginBottom: theme.spacing.lg,
      }}
    >
      <View style={[{ flex: 1, justifyContent: "space-between" }]}>
        <Text style={[theme.fonts.body["18pt_semibold"], { flex: 1 }]}>
          {reservation.court.name}
        </Text>
        <CourtType courtType={reservation.court.courtType} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.sm,
          }}
        >
          {reservation.status.map((status) => {
            return <Chip status={status} />;
          })}
        </View>
      </View>
      <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <Text
          style={[
            theme.fonts.body["18pt_regular"],
            { flex: 1, textAlign: "right" },
          ]}
        >
          {formatTime(reservation.from)} - {formatTime(reservation.to)}
        </Text>
        <Button
          text="Cancel"
          type="error02"
          onPress={handleCancelReservation}
        />
      </View>
    </Pressable>
  );
}
export default Page;
