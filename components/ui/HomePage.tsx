import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, StyleSheet, View } from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import CustomMarker from "@/components/CustomMarker";
import { ChargerDetails, Chargers } from "@/constants/Chargers";
import * as MediaLibrary from "expo-media-library";
import { FAB } from "react-native-paper";
import {
  ASPECT_RATIO,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../helper/locationHelper";
import ChargerDetailsCard from "./ChargerDetailsCard";

const { width } = Dimensions.get("window");

const HomePage = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [chargers, setChargers] = useState<any>(Chargers);
  const [selectedCharger, setSelectedCharger] = useState<ChargerDetails | null>(
    null
  );
  const mapRef = useRef<MapView>(null); // Create a ref for the MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  let text = "Waiting for location...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location); // You'll use the coordinates from here
  }

  const goToSpecificLocation = (locationDetails?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    // Example coordinates (replace with your desired location)
    const fallbackLocation = {
      latitude: 28.5215,
      longitude: 77.2041,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    mapRef.current?.animateToRegion(locationDetails || fallbackLocation, 1000); // Animate to the new region
  };

  const onMarkerPress = (charger: ChargerDetails) => {
    // Handle marker press event
    console.log("Marker pressed:", charger);
    setSelectedCharger(charger);

    const LATITUDE_DELTA = 0.5; // Adjust as needed for zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    goToSpecificLocation({
      latitude: Number(charger.latitude),
      longitude: Number(charger.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }); // Move to the marker location
  };
  const handleCardPress = (charger: ChargerDetails) => {
    // Handle card press event
    console.log("Card pressed:", charger);
    setSelectedCharger(charger);

    const LATITUDE_DELTA = 0.5; // Adjust as needed for zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    goToSpecificLocation({
      latitude: Number(charger.latitude),
      longitude: Number(charger.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }); // Move to the card location
  };

  const takeMapSnapshot = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable media library access to save the snapshot."
        );
        return;
      }
      if (mapRef.current) {
        mapRef.current
          .takeSnapshot({
            format: "png",
            result: "file",
          })
          .then(async (uri) => {
            // uri is a path to the image on the local storage
            await MediaLibrary.saveToLibraryAsync(uri);
            alert("Map snapshot saved to library!");
          })
          .catch((error) => {
            console.error("takeSnapshot failed", error);
          });
      }
    } catch (error) {
      console.log("Error taking map snapshot:", error);
      Alert.alert("Error", "An error occurred while taking the snapshot.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Assign the ref to the MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords?.latitude || 28.6139, // Default latitude (e.g., Delhi)
          longitude: location?.coords?.longitude || 77.209, // Default longitude (e.g., Delhi)
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
      >
        {chargers.map((charger: any) => (
          <Marker
            key={charger.id}
            coordinate={{
              latitude: parseFloat(charger.latitude),
              longitude: parseFloat(charger.longitude),
            }}
            title={charger.name}
            description={charger.address}
            onPress={() => onMarkerPress(charger)}
          >
            <CustomMarker charger={charger} currentLocation={selectedCharger} />
          </Marker>
        ))}
      </MapView>

      <FlatList
        data={chargers}
        horizontal
        style={styles.cardContainer}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 20} // Adjust based on card width + margin
        decelerationRate="fast"
        renderItem={({ item }) => (
          <ChargerDetailsCard
            key={item.id}
            charger={item}
            onPress={handleCardPress}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      <FAB
        style={styles.fab}
        icon="camera"
        onPress={() => {
          console.log("FAB pressed");
          takeMapSnapshot(); // Call the function to capture map snapshot
        }}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  cardContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
});
