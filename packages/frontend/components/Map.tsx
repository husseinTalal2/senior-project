import React, { useEffect, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import Button from "./Button";
import useTheme from "../utils/hooks/useTheme";
import { Theme } from "../constants/Theme";

type Location = {
  latitude: number;
  longitude: number;
};
type Props = {
  // setLocation: (props: LatLng) => void;
  location: Location;
  style?: StyleProp<ViewStyle>;
};

function Map({ location, style }: Props) {
  const theme = useTheme();
  // const [markedLocation, setMarkedLocation] = useState<LatLng | null>(null);
  // const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setUserLocation(location.coords);
  //   };

  //   requestLocationPermission();
  // }, []);

  // const nav = useNavigation();

  // const handleMyLocationPress = () => {
  //   if (userLocation) setLocation(userLocation);
  // };

  // const handleMarkerLocationPress = () => {
  //   if (markedLocation) setLocation(markedLocation);
  // };

  // const handleSettingMarker = (cord: LatLng) => {
  //   setMarkedLocation(cord);
  // };

  return (
    <MapView
      // onPress={({ nativeEvent }) => {
      //   handleSettingMarker(nativeEvent.coordinate);
      // }}
      style={[
        {
          width: "100%",
          height: 220,
        },
        style,
      ]}
      // showsUserLocation
      // followsUserLocation
      initialRegion={{
        latitude: 36.1901,
        longitude: 43.993,
        latitudeDelta: 0.2,
        longitudeDelta: 0.25,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
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
