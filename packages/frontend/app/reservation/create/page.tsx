import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../utils/hooks/useTheme";
import { api } from "../../../utils/trpc";
import CustomCalendar from "../../../components/CustomCalendar";
import { useGlobalSearchParams } from "expo-router";
import DayTimePicker from "../../../components/DayTimePicker";
import { useHookstate } from "@hookstate/core";
import { reservationStates } from "../../../states/reservationStates";
import {
  createDateFromObject,
  setAfterHour,
  setTimeFromString,
} from "../../../utils/dateUtils";
import Divider from "../../../components/Divider";
import Button from "../../../components/Button";
import { Header } from "../[id]/page";

function CreateReservation() {
  const selectedDay = useHookstate(reservationStates.selectedDay);
  const selectedTime = useHookstate(reservationStates.selectedTime);
  const [canReserve, setCanReserve] = useState(false);
  const theme = useTheme();
  const params = useGlobalSearchParams<{ courtId: string }>();

  const schedule = api.court.getCourtSchedule.useQuery({
    id: Number(params.courtId),
  });

  useEffect(() => {
    setCanReserve(!!(selectedDay.get() && selectedTime.get()));
  }, [selectedDay.get(), selectedTime.get()]);

  const reserveMutation = api.reservation.createNewReservation.useMutation();
  const handleReservePress = () => {
    const day = selectedDay.get();
    const time = selectedTime.get();
    if (day && time) {
      const to = setAfterHour(setTimeFromString(day, time)).toISOString();
      reserveMutation.mutate({
        courtId: parseInt(params.courtId),
        from: setTimeFromString(day, time).toISOString(),
        to,
        homeTeamId: 1,
      });
    }
  };

  if (schedule.isLoading)
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

  if (schedule.data) {
    const scheduledHours = schedule.data!.reservations.map((reservation) => {
      if (reservation.awayTeamId && reservation.homeTeamId) {
        return new Date(reservation.from);
      }
    });

    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          width: "100%",
        }}
      >
        <Header title="Select Date and Time" />
        <ScrollView
          style={{ width: "100%", paddingVertical: theme.spacing["2xl"] }}
        >
          <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            <View style={{ marginBottom: theme.spacing["2xl"], width: "100%" }}>
              <CustomCalendar
                scheduled={scheduledHours}
                onDayPress={(day) => {
                  selectedDay.set(new Date(day.dateString));
                }}
              />
            </View>
          </View>
          {!!selectedDay.get() && (
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Divider />

              <View
                style={{
                  marginTop: theme.spacing["2xl"],
                  justifyContent: "center",
                }}
              >
                <DayTimePicker allScheduledTimes={scheduledHours} />
              </View>
            </View>
          )}

          <Button
            text="Reserve"
            style={{
              marginHorizontal: theme.spacing["2xl"],
              marginBottom: theme.spacing["4xl"],
              marginTop: theme.spacing["3xl"],
            }}
            onPress={handleReservePress}
          />
        </ScrollView>
      </View>
    );
  }
}

export default CreateReservation;
