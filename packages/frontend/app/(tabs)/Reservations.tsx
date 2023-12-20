import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { api } from "../../utils/trpc";
import { FlashList } from "@shopify/flash-list";
import ReservationItem from "../../components/ReservationItem";
import useTheme from "../../utils/hooks/useTheme";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalUser, useUser } from "../../utils/hooks/useUser";
import OwnerReservations from "../../components/OwnerReservations";

function Reservations() {
  const theme = useTheme();
  const { user } = useUser();

  const reservations = api.reservation.getByUserId.useQuery({
    userId: user.data?.id || "",
  });

  if (user.data?.role === "OWNER") {
    return <OwnerReservations userId={user.data.id} />;
  }

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
        }}
      >
        <Text style={theme.fonts.header["22pt_semibold"]}>
          There is no reservations for now
        </Text>
      </View>
    );
  }

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
