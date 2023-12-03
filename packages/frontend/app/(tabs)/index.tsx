import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { api } from "../../utils/trpc";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import useTheme from "../../utils/hooks/useTheme";
import { ShoppingCartSimple } from "phosphor-react-native";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import SearchInput from "../../components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import CourtItem from "../../components/CourtItem";
import BottomSheet from "@gorhom/bottom-sheet";

function Home() {
  const theme = useTheme();
  // const courts = api.court.getAll.useQuery();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", overflow: "visible" }}
    >
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
          // paddingHorizontal: theme.spacing.md,
          overflow: "visible",
        }}
      >
        <SearchInput placeholder="Search" />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
        {/* {courts.isLoading && <ActivityIndicator />}
        {courts.isFetched && (
          <FlashList
            data={courts.data}
            renderItem={({ item }) => <CourtItem court={item} />}
            contentContainerStyle={{ paddingVertical: theme.spacing["2xl"] }}
            estimatedItemSize={200}
          />
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
