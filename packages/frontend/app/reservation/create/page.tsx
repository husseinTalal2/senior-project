import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../utils/hooks/useTheme";
import { api } from "../../../utils/trpc";
import CustomCalendar from "../../../components/CustomCalendar";
import { useGlobalSearchParams } from "expo-router";
import DayTimePicker from "../../../components/DayTimePicker";

function CreateReservation() {
  const theme = useTheme();
  const params = useGlobalSearchParams<{ courtId: string }>();
  const schedule = api.court.getCourtSchedule.useQuery({
    id: Number(params.courtId),
  });

  // if (schedule.isLoading)
  //   return (
  //     <View
  //       style={{
  //         height: "100%",
  //         width: "100%",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <ActivityIndicator />
  //     </View>
  //   );

  // if (schedule.data)
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {/* <CustomCalendar
          scheduled={schedule.data.schedule}
          onDayPress={(day) => {
            console.log(day);
          }}
        /> */}
      <DayTimePicker />
    </SafeAreaView>
  );
}

export default CreateReservation;
