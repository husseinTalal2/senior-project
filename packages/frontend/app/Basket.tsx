// CartScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearBasket, removeItem } from "../redux/slices/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { CaretLeft, ShoppingCartSimple, Trash } from "phosphor-react-native";
import useTheme from "../utils/hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { OrderItem } from "backend/src/types/types";
import Divider from "../components/Divider";
import { truncateText } from "../utils/truncateText";
import Button from "../components/Button";
import { api } from "../utils/trpc";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

const CartScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  function calculateTotalAmount(): number {
    const totalAmount = basketItems.reduce((total, orderItem) => {
      if (orderItem.item) {
        return total + orderItem.quantity * orderItem.item?.price || 0;
      }
      return 0;
    }, 0);

    return totalAmount;
  }

  const order = api.order.create.useMutation();

  function handleCheckout() {
    order.mutate({
      items: basketItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
      userId: user.user!.id,
    });
  }

  useEffect(() => {
    if (order.isSuccess) {
      dispatch(clearBasket());
      router.replace("/(tabs)");
    }
  }, [order.isSuccess]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <BasketHeader />
      {!basketItems.length && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text
            style={{
              ...theme.fonts.display.small,
            }}
          >
            Your basket is empty
          </Text>
        </View>
      )}
      {!!basketItems.length && (
        <FlashList
          data={basketItems}
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing["2xl"],
            paddingTop: theme.spacing["2xl"],
          }}
          ListFooterComponent={() => {
            return (
              <View style={{ gap: theme.spacing["2xl"] }}>
                <Divider />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...theme.fonts.title.large }}>Total</Text>
                  <Text style={{ ...theme.fonts.title.large }}>
                    ${calculateTotalAmount()}
                  </Text>
                </View>
                <Button
                  style={{
                    flex: 1,
                  }}
                  text="Checkout"
                  onPress={handleCheckout}
                  prefixIcon={
                    <ShoppingCartSimple
                      style={{
                        marginRight: theme.spacing.sm,
                      }}
                      weight="bold"
                      size={24}
                      color={theme.colors.textOnColor}
                    />
                  }
                />
              </View>
            );
          }}
          renderItem={({ item }) => <BasketItem item={item} />}
        />
      )}
    </View>
  );
};

const BasketItem = ({ item }: { item: OrderItem }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDeletePress = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  return (
    <View
      style={{
        marginBottom: theme.spacing.lg,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        padding: theme.spacing.lg,
        flexDirection: "row",
        gap: theme.spacing.md,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: theme.borderRadius.sm,
        borderWidth: 1,
        justifyContent: "space-between",
      }}
    >
      <Link
        href={{
          pathname: "/item/[id]",
          params: { id: item.itemId },
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 200,
        }}
      />
      <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
        <Image
          source={{ uri: item.item?.img }}
          style={{
            width: 70,
            height: 70,
            borderRadius: theme.borderRadius.sm,
          }}
          contentFit="contain"
        />
        <View>
          <Text style={{ ...theme.fonts.label.large }}>
            {truncateText(item.item?.name, 20)}
          </Text>
          <Text style={{ ...theme.fonts.label.large }}>
            ${item.item?.price}
          </Text>
          <Text style={{ ...theme.fonts.label.large }}>
            Quantity: {item.quantity}
          </Text>
        </View>
      </View>
      <Pressable
        style={{ zIndex: 300 }}
        onPress={() => handleDeletePress(item.itemId)}
      >
        <Trash color={theme.colors.error} size={30} weight="thin" />
      </Pressable>
    </View>
  );
};

const BasketHeader = () => {
  const router = useRouter();
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
          flexDirection: "row",
          paddingHorizontal: theme.spacing["2xl"],
        }}
      >
        <Pressable onPress={() => router.back()}>
          <CaretLeft weight="bold" size={26} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
