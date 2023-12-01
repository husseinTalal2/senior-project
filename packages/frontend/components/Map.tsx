import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import Button from "./Button";
import useTheme from "../utils/hooks/useTheme";
import { Theme } from "../constants/Theme";

type Props = {
  setLocation: (props: LatLng) => void;
};

function Map({ setLocation }: Props) {
  const theme = useTheme();
  const [markedLocation, setMarkedLocation] = useState<LatLng | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    requestLocationPermission();
  }, []);

  const nav = useNavigation();

  const handleMyLocationPress = () => {
    if (userLocation) setLocation(userLocation);
  };

  const handleMarkerLocationPress = () => {
    if (markedLocation) setLocation(markedLocation);
  };

  const handleSettingMarker = (cord: LatLng) => {
    setMarkedLocation(cord);
  };

  return (
    <View style={styles(theme).container}>
      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            gap: theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            alignItems: "center",
            justifyContent: "center",
          },
          styles(theme).selectButtons,
        ]}
      >
        <Button onPress={handleMyLocationPress} text="Use my location" />
        {!!markedLocation && (
          <Button
            onPress={handleMarkerLocationPress}
            text="Use marked location"
          />
        )}
      </View>

      <MapView
        onPress={({ nativeEvent }) => {
          handleSettingMarker(nativeEvent.coordinate);
        }}
        style={styles(theme).map}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: 36.1901,
          longitude: 43.993,
          latitudeDelta: 0.3,
          longitudeDelta: 0.25,
        }}
      >
        {markedLocation && (
          <Marker
            coordinate={{
              latitude: markedLocation.latitude,
              longitude: markedLocation.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
    },
    backButton: {
      position: "absolute",
      top: theme.spacing["4xl"],
      left: 24,
      zIndex: 20,
    },
    selectButtons: {
      position: "absolute",
      bottom: theme.spacing["xl"],
      // left: 24,
      zIndex: 20,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });

export default Map;
