import { router, useGlobalSearchParams, useRouter } from "expo-router";
import { CaretLeft, House, Shower, SoccerBall } from "phosphor-react-native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../../utils/hooks/useTheme";
import { api } from "../../utils/trpc";
import { Image } from "expo-image";
import Divider from "../../components/Divider";
import Map from "../../components/Map";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { Chip } from "../../components/ReservationItem";
import { formatTime } from "../../utils/dateUtils";
// import { ReservationItem } from "../team/[id]/page";

function CourtScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const theme = useTheme();
  const court = api.court.getById.useQuery({ id: parseInt(params.id) });
  const reserveMutation =
    api.reservation.createNewReservationById.useMutation();

  const handleCreateReservation = (
    reservationId: number,
    awayTeamId: number
  ) => {
    reserveMutation.mutate({
      awayTeamId,
      reservationId,
    });
  };

  if (reserveMutation.isSuccess) {
    router.replace(`/reservation/${reserveMutation.data.id}/page`);
  }

  if (court.isLoading) {
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

  if (court.data) {
    return (
      <>
        <Header />
        <ScrollView>
          <Image
            source={{ uri: court.data?.imgs[0] }}
            style={{
              width: "100%",
              height: 270,
            }}
            contentFit="cover"
          />
          <View
            style={{
              paddingHorizontal: theme.spacing["2xl"],
              paddingVertical: theme.spacing["2xl"],
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: theme.spacing["3xl"],
              }}
            >
              <View>
                <Text
                  style={{
                    ...theme.fonts.header["22pt_semibold"],
                    color: theme.colors.shade02,
                  }}
                >
                  {court.data.name}
                </Text>
                <Text
                  style={{
                    ...theme.fonts.body["14pt_regular"],
                    color: theme.colors.neutral08,
                  }}
                >
                  {court.data.address}
                </Text>
              </View>
              <View>
                {court.data.rating && <Text>{court.data.rating}</Text>}
              </View>
            </View>
            <Divider />
            <CourtType courtType={court.data.courtType} />
            <Divider />
            <Facilities facilities={court.data.facilities} />
            <Divider />
            <Map
              style={{
                marginVertical: theme.spacing["2xl"],
                marginBottom: theme.spacing["4xl"],
              }}
              location={court.data.location}
            />
            <Divider />
            <View style={{ marginTop: theme.spacing["2xl"] }}>
              <Text
                style={[
                  theme.fonts.header["22pt_semibold"],
                  { marginBottom: theme.spacing.lg },
                ]}
              >
                Current Reservations
              </Text>
              {court.data.reservations.map((reservation) => {
                return (
                  <Pressable
                    onPress={() =>
                      router.push(`/reservation/${reservation.id}/page`)
                    }
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
                    <View
                      style={[{ flex: 1, justifyContent: "space-between" }]}
                    >
                      <Text
                        style={[theme.fonts.body["18pt_semibold"], { flex: 1 }]}
                      >
                        {court.data?.name}
                      </Text>
                      <CourtType courtType={court.data!.courtType} />
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
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={[
                          theme.fonts.body["18pt_regular"],
                          { flex: 1, textAlign: "right" },
                        ]}
                      >
                        {formatTime(reservation.from)} -{" "}
                        {formatTime(reservation.to)}
                      </Text>
                      <Button
                        text="Reserve"
                        type="success"
                        onPress={() =>
                          handleCreateReservation(reservation.id, 2)
                        }
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: 68,
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
            paddingHorizontal: theme.spacing["2xl"],
            justifyContent: "space-between",
            // borderTopWidth: 1,
            ...Platform.select({
              android: {
                elevation: 3,
              },
              ios: {
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
              },
            }),
          }}
        >
          <Text style={theme.fonts.header["22pt_semibold"]}>
            {court.data.pricePerHour}$/Hour
          </Text>
          <Button
            text="Reserve"
            onPress={() => {
              router.push(`/reservation/create/page?courtId=${court.data!.id}`);
            }}
          />
        </View>
      </>
    );
  }
}

function Facilities({ facilities }: { facilities: string[] }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing["2xl"],
      }}
    >
      {facilities.map((facility) => {
        return <Facility facility={facility} />;
      })}
    </View>
  );
}

function Facility({ facility }: { facility: string }) {
  const theme = useTheme();
  const getIcon = (facility: string) => {
    if (facility === "SHOWERS") return <Shower size={32} weight="thin" />;
    if (facility === "CHANGING_ROOMS") return <House size={32} weight="thin" />;
    if (facility === "INDOOR") return <House size={32} weight="thin" />;
    if (facility === "OUTDOOR") return <House size={32} weight="thin" />;
  };
  return (
    <View
      style={{
        // paddingHorizontal: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        justifyContent: "space-between",
        // alignItems: "center",
        borderWidth: 1,
        borderRadius: theme.borderRadius.sm,
        // minWidth: 100,
        // minHeight: 100,
      }}
    >
      {getIcon(facility)}
      <Text
        style={{
          marginTop: theme.spacing.sm,
          ...theme.fonts.body["14pt_regular"],
          color: theme.colors.shade02,
        }}
      >
        {facility}
      </Text>
    </View>
  );
}

export function CourtType({ courtType }: { courtType: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing["2xl"],
      }}
    >
      <SoccerBall weight="thin" size={32} />
      <Text
        style={{
          ...theme.fonts.body["13pt_semibold"],
          color: theme.colors.shade02,
        }}
      >
        {courtType}
      </Text>
    </View>
  );
}

function Header() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        top: insets.top,
        position: "absolute",
        width: "100%",
        backgroundColor: "transparent",
        paddingHorizontal: theme.spacing.lg,
        zIndex: 20,
      }}
    >
      <IconButton
        onPress={router.back}
        icon={<CaretLeft weight="thin" size={24} />}
      />
    </View>
  );
}

function IconButton({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: JSX.Element;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        width: 32,
        height: 32,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </Pressable>
  );
}

export default CourtScreen;
