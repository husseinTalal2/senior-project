import { RouterOutput } from "backend";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import DayTimePicker from "./DayTimePicker";
import { ScrollView } from "react-native-gesture-handler";

interface CalendarProps {
  onDayPress: (day: DateData) => void;
  scheduled: Date[];
}

const CustomCalendar: React.FC<CalendarProps> = ({ onDayPress, scheduled }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  function formatDateToCustomFormat(inputDate: Date) {
    const dateObject = new Date(inputDate);

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

  function generateFormattedDatesArray(datesArray: Date[]) {
    const formattedDates: Record<string, MarkingProps> = {};

    datesArray.forEach((date) => {
      const formattedDate = formatDateToCustomFormat(date);

      formattedDates[formattedDate] = {
        inactive: true,
        disableTouchEvent: true,
        disabled: true,
      };
    });

    return formattedDates;
  }
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          onDayPress(day);
        }}
        markedDates={
          scheduled?.length ? generateFormattedDatesArray(scheduled) : undefined
        }
      />
      <DayTimePicker />
    </View>
  );
};

export default CustomCalendar;
