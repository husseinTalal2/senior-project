import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { api } from "../../utils/trpc";
import { FlashList } from "@shopify/flash-list";
import ReservationItem from "../../components/ReservationItem";
import useTheme from "../../utils/hooks/useTheme";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function Reservations() {
  const theme = useTheme();
  const reservations = api.reservation.getByUserId.useQuery({
    userId: "d143d69c-81ba-4dcf-a8f6-7d888294412e",
  });

  if (reservations.isLoading) {
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
  if (!reservations.data?.length) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <Text style={theme.fonts.header["22pt_semibold"]}>
          There is no reservations for now
        </Text>
      </View>
    );
  }

  console.log(reservations.data);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <FlashList
        data={reservations.data}
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

export default Reservations;
