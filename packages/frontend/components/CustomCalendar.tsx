import { RouterOutput } from "backend";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import DayTimePicker from "./DayTimePicker";
import { ScrollView } from "react-native-gesture-handler";
import useTheme from "../utils/hooks/useTheme";
import Divider from "./Divider";
import { useHookstate } from "@hookstate/core";
import { reservationStates } from "../states/reservationStates";

interface CalendarProps {
  onDayPress: (day: DateData) => void;
  scheduled?: Array<Date | undefined> | undefined;
}

const CustomCalendar = ({ onDayPress, scheduled }: CalendarProps) => {
  const selectedDay = useHookstate(reservationStates.selectedDay);

  const theme = useTheme();
  function formatDateToCustomFormat(inputDate: Date | undefined) {
    if (inputDate) {
      const dateObject = inputDate;

      // Ensure the input date is valid
      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date");
      }

      // Get year, month, and day
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(dateObject.getDate()).padStart(2, "0");

      // Assemble the formatted date
      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    }
  }

  function generateFormattedDatesArray(
    datesArray: (Date | undefined)[] | undefined
  ) {
    if (datesArray) {
      const formattedDates: Record<string, MarkingProps> = {};
      datesArray.forEach((date) => {
        const formattedDate = formatDateToCustomFormat(date);

        if (formattedDate) {
          formattedDates[formattedDate] = {
            dotColor: "#f00",
            marked: true,
          };
        }
      });

      return formattedDates;
    }
  }
  const [markedDates, setMarkedDates] =
    useState<Record<string, MarkingProps>>();

  const [currentSelectedDate, setCurrentSelectedDate] = useState<
    string | undefined
  >(formatDateToCustomFormat(new Date()));
  useEffect(() => {
    setMarkedDates(generateFormattedDatesArray(scheduled));
  }, [selectedDay.get(), currentSelectedDate]);

  return (
    <Calendar
      onDayPress={(day) => {
        onDayPress(day);
        setCurrentSelectedDate(day.dateString);
      }}
      theme={{
        todayTextColor: theme.colors.primary02,
      }}
      markedDates={
        currentSelectedDate
          ? {
              ...markedDates,
              [currentSelectedDate]: { selected: true },
            }
          : markedDates
      }
    />
  );
};

export default CustomCalendar;
