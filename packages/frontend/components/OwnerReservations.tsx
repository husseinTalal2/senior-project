import { FlashList } from "@shopify/flash-list";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../utils/trpc";
import useTheme from "../utils/hooks/useTheme";
import { RouterOutput } from "backend";
import { router } from "expo-router";
import { Theme } from "../constants/Theme";
import Button from "./Button";
import { formatTime } from "../utils/dateUtils";
import { CourtType } from "../app/court/[id]";
import { Chip } from "./ReservationItem";

function OwnerReservations({ userId }: { userId: string }) {
  const theme = useTheme();
  const allReservations = api.court.getOwnerReservations.useQuery({
    ownerUserId: userId,
  });

  if (allReservations.isLoading) {
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

  if (allReservations.data?.length) {
    const reservations: any[] = [];
    allReservations.data.map((courtReservations) => {
      courtReservations.reservations.map((reservation) => {
        reservations.push({ ...reservation, court: { ...courtReservations } });
      });
    });
    return (
      <SafeAreaView
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <FlashList
          onRefresh={() => {
            allReservations.refetch();
          }}
          refreshing={allReservations.isLoading}
          data={reservations}
          renderItem={({ item }) => <ReservationItem reservation={item} />}
          contentContainerStyle={{
            paddingVertical: theme.spacing["2xl"],
            paddingHorizontal: theme.spacing["2xl"],
          }}
          estimatedItemSize={200}
        />
      </SafeAreaView>
    );
  }
}

// type Reservation = RouterOutput["court"]["getOwnerReservations"][0]["reservations"][0];
type Status = "CONFIRMED" | "DECLINED" | "PENDING" | "NO_ENOUGH_PLAYERS";
function ReservationItem({ reservation }: { reservation: any }) {
  const theme = useTheme();
  const updateStatus = api.reservation.updateStatus.useMutation();
  const handleReservationUpdate = (reservationId: number, status: Status) => {
    updateStatus.mutate({
      reservationId,
      status,
    });
  };

  return (
    <Pressable
      onPress={() => router.push(`/reservation/${reservation.id}/page`)}
      style={styles(theme).container}
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
        <View style={{ flexDirection: "row", gap: 10 }}>
          {!!reservation.status.includes("DECLINED") && (
            <Button
              text="Confirm"
              type="success"
              onPress={() =>
                handleReservationUpdate(reservation.id, "CONFIRMED")
              }
            />
          )}
          {!!reservation.status.includes("CONFIRMED") && (
            <Button
              text="Cancel"
              type="error02"
              onPress={() =>
                handleReservationUpdate(reservation.id, "DECLINED")
              }
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
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
    },
  });

export default OwnerReservations;
