import React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";
import { Theme } from "../constants/Theme";
import { CourtType } from "../app/court/[id]";
import { RouterOutput } from "backend";
import Button from "./Button";
import useTheme from "../utils/hooks/useTheme";

type Reservation = RouterOutput["reservation"]["getByUserId"][0];
function ReservationItem({ reservation }: { reservation: Reservation }) {
  const theme = useTheme();
  const handleCancelReservation = () => {};

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).subContainer}>
        <Text>{reservation.court.address}</Text>
        <CourtType courtType={reservation.court.courtType} />
        <View>
          {reservation.status.map((status) => {
            return <Chip status={status} />;
          })}
        </View>
      </View>
      <View style={styles(theme).subContainer}>
        <Text>
          {reservation.from} - {reservation.to}
        </Text>
        <Button
          text="Cancel"
          type="error02"
          onPress={handleCancelReservation}
        />
      </View>
    </View>
  );
}

const Chip = ({ status }: { status: Reservation["status"][0] }) => {
  const theme = useTheme();
  const getBgColor = () => {
    if ((status = "CONFIRMED")) return `${theme.colors.success}1c`;
    if ((status = "DECLINED")) return `${theme.colors.accent01}`;
    if ((status = "NO_ENOUGH_PLAYERS")) return `${theme.colors.accent01}`;
    if ((status = "PENDING")) return `${theme.colors.warning}1c`;
    return "#fff";
  };

  const getTextColor = () => {
    if ((status = "CONFIRMED")) return `${theme.colors.success}`;
    if ((status = "DECLINED")) return `${theme.colors.error02}`;
    if ((status = "NO_ENOUGH_PLAYERS")) return `${theme.colors.error02}`;
    if ((status = "PENDING")) return `${theme.colors.warning}`;
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
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.lg,
      flexDirection: "row",
    },
    subContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
  });

export default ReservationItem;
