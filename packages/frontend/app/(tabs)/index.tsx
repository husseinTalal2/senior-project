import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { api } from "../../utils/trpc";
import { useEffect } from "react";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import useTheme from "../../utils/hooks/useTheme";
import { ShoppingCartSimple } from "phosphor-react-native";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import SearchInput from "../../components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import CourtItem from "../../components/CourtItem";

function Home() {
  const theme = useTheme();
  const courts = api.court.getAll.useQuery();

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
        {courts.isLoading && <ActivityIndicator />}
        {courts.isFetched && (
          <FlashList
            data={courts.data}
            renderItem={({ item }) => <CourtItem court={item} />}
            contentContainerStyle={{ paddingVertical: theme.spacing["2xl"] }}
            estimatedItemSize={200}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const HomeHeader = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        zIndex: 20,
        height: 100,
        width: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: theme.spacing["2xl"],
        }}
      >
        <Text style={{ ...theme.fonts.headline.large, fontWeight: "700" }}>
          Home
        </Text>
        <Link href={{ pathname: "/Basket" }}>
          <ShoppingCartSimple
            size={32}
            weight="thin"
            color={theme.colors.primary}
          />
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Home;
