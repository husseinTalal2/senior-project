import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Theme } from "../constants/Theme";
import useTheme from "../utils/hooks/useTheme";

interface DayTimePickerProps {
  // Add any additional props you might need
}

const DayTimePicker: React.FC<DayTimePickerProps> = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    console.log(selectedTime);
  }, [selectedTime]);
  const generateTimeSlots = () => {
    const amTimeSlots: JSX.Element[] = [];
    const pmTimeSlots: JSX.Element[] = [];
    for (let hour = 1; hour <= 12; hour++) {
      const amTime = `${hour < 10 ? "0" + hour : hour}:00`;
      const pmTime = `${hour < 10 ? "0" + hour : hour}:00`;

      // Check if the time is selected, disabled, or available
      const isDisabled: boolean = false;
      const isSelected: boolean = false;

      const timeSlotStyle = [
        styles(theme).timeSlot,
        isDisabled ? styles(theme).disabled : undefined,
        isSelected ? styles(theme).selected : undefined,
      ];

      amTimeSlots.push(
        <TouchableOpacity
          key={amTime}
          style={timeSlotStyle}
          onPress={() => handleTimePress(amTime)}
          disabled={isDisabled}
        >
          <Text>{amTime}</Text>
        </TouchableOpacity>
      );

      pmTimeSlots.push(
        <TouchableOpacity
          key={pmTime}
          style={timeSlotStyle}
          onPress={() => handleTimePress(pmTime)}
          disabled={isDisabled}
        >
          <Text>{pmTime}</Text>
        </TouchableOpacity>
      );
    }
    return { amTimeSlots, pmTimeSlots };
  };

  const handleTimePress = (time: string) => {
    // Handle logic when a time slot is pressed
    setSelectedTime(time);
  };

  return (
    <View style={styles(theme).container}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {generateTimeSlots().amTimeSlots}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {generateTimeSlots().pmTimeSlots}
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 12,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      paddingHorizontal: theme.spacing["2xl"],
    },
    timeSlot: {
      // width: "45%",
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
