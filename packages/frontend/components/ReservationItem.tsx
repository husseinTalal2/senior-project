import React from "react";
import { StyleSheet, View, Platform, Text, Pressable } from "react-native";
import { Theme } from "../constants/Theme";
import { CourtType } from "../app/court/[id]";
import { RouterOutput } from "backend";
import Button from "./Button";
import useTheme from "../utils/hooks/useTheme";
import { router } from "expo-router";
import { formatTime } from "../utils/dateUtils";

type Reservation = RouterOutput["reservation"]["getByUserId"][0];
function ReservationItem({ reservation }: { reservation: Reservation }) {
  const theme = useTheme();
  const handleCancelReservation = () => {};

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
        <Button
          text="Cancel"
          type="error02"
          onPress={handleCancelReservation}
        />
      </View>
    </Pressable>
  );
}

export const Chip = ({ status }: { status: Reservation["status"][0] }) => {
  const theme = useTheme();
  const getBgColor = () => {
    if (status == "CONFIRMED") return `${theme.colors.success}19`;
    if (status == "DECLINED") return `${theme.colors.accent01}`;
    if (status == "NO_ENOUGH_PLAYERS") return `${theme.colors.accent01}`;
    if (status == "PENDING") return `${theme.colors.warning}19`;
    return "#fff";
  };

  const getTextColor = () => {
    if (status == "CONFIRMED") return `${theme.colors.success}`;
    if (status == "DECLINED") return `${theme.colors.error02}`;
    if (status == "NO_ENOUGH_PLAYERS") return `${theme.colors.error02}`;
    if (status == "PENDING") return `${theme.colors.warning}`;
    return "#000";
  };

  return (
    <View
      style={{
        backgroundColor: getBgColor(),
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
      }}
    >
      <Text
        style={{ color: getTextColor(), ...theme.fonts.body["12pt_regular"] }}
      >
        {status}
      </Text>
    </View>
  );
};

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
    },
  });

export default ReservationItem;
