import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Theme } from "../constants/Theme";
import useTheme from "../utils/hooks/useTheme";
import { useHookstate } from "@hookstate/core";
import { reservationStates } from "../states/reservationStates";
import { withDecay } from "react-native-reanimated";

interface DayTimePickerProps {
  allScheduledTimes: (Date | undefined)[];
}

const DayTimePicker = ({ allScheduledTimes }: DayTimePickerProps) => {
  const selectedDay = useHookstate(reservationStates.selectedDay);
  const [currentDayReservedTimes, setCurrentDayReservedTimes] =
    useState<(Date | undefined)[]>();
  const theme = useTheme();

  function filterDatesByDay(dates: (Date | undefined)[], specificDay: Date) {
    const filteredDates = dates.filter(
      (date) => date?.getDay() === specificDay.getDay()
    );
    return filteredDates;
  }

  function areDatesEqualToTimeString(
    dates: (Date | undefined)[] | undefined,
    timeString: string
  ) {
    if (dates) {
      return dates.some((date) => {
        if (date) {
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const amOrPm = date.getHours() < 12 ? "AM" : "PM";
          const formattedDate = `${hours}:${minutes} ${amOrPm}`;

          return formattedDate === timeString;
        }
      });
    }
  }

  useEffect(() => {
    const theDay = selectedDay.get();
    if (theDay !== null)
      setCurrentDayReservedTimes(filterDatesByDay(allScheduledTimes, theDay));
  }, [selectedDay.get()]);

  const times = [
    "12:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
  ];

  return (
    <View style={styles(theme).container}>
      <View style={{ gap: 12, justifyContent: "center", alignItems: "center" }}>
        <Text style={[theme.fonts.header["22pt_semibold"]]}>AM</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.md,
            justifyContent: "center",
          }}
        >
          {times.map((time) => {
            return (
              <TimeItem
                time={time}
                dayPart="AM"
                isReserved={areDatesEqualToTimeString(
                  currentDayReservedTimes,
                  `${time} AM`
                )}
              />
            );
          })}
        </View>
      </View>
      <View style={{ gap: 12, justifyContent: "center", alignItems: "center" }}>
        <Text style={theme.fonts.header["22pt_semibold"]}>PM</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.md,
            justifyContent: "center",
          }}
        >
          {times.map((time) => {
            return (
              <TimeItem
                time={time}
                dayPart="PM"
                isReserved={areDatesEqualToTimeString(
                  currentDayReservedTimes,
                  `${time} PM`
                )}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const TimeItem = ({
  time,
  dayPart,
  isReserved,
}: {
  time: string;
  dayPart: string;
  isReserved: boolean | undefined;
}) => {
  const selectedTime = useHookstate(reservationStates.selectedTime);
  const theme = useTheme();
  const isSelected = selectedTime.get() === `${time} ${dayPart}`;

  const getColor = () => {
    if (isReserved) {
      return theme.colors.shade02_30percent;
    }
    if (isSelected) return theme.colors.primary01;
    else return "#000";
  };

  return (
    <Pressable
      onPress={() => {
        selectedTime.set(`${time} ${dayPart}`);
      }}
      disabled={isReserved}
      style={{
        // minWidth: 80,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderWidth: 1,
        borderColor: getColor(),
      }}
    >
      <Text style={[theme.fonts.body["16pt_semibold"], { color: getColor() }]}>
        {time}
      </Text>
    </Pressable>
  );
};
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center",
      paddingHorizontal: theme.spacing["2xl"],
    },
    timeSlot: {
      marginVertical: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
    },
    disabled: {
      backgroundColor: "#eee",
    },
    selected: {
      backgroundColor: "lightblue",
    },
  });

export default DayTimePicker;
