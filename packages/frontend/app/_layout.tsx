import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TRPCProvider } from "../utils/trpc";
import { Provider } from "react-redux";
import store from "../redux/store";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "SF Pro Display Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF Pro Display SemiBold": require("../assets/fonts/SF-Pro-Display-Semibold.otf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <TRPCProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
      </TRPCProvider>
    </Provider>
  );
}
