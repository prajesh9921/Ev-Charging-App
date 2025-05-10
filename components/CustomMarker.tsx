import { ChargerDetails } from "@/constants/Chargers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CustomMarker = ({ charger, currentLocation }: { charger: ChargerDetails, currentLocation: ChargerDetails | null}) => {
  const isSelected = currentLocation?.id === charger.id;
  return (
    <View style={isSelected ? styles.customMarkerSelected : styles.customMarker}>
      <Text style={styles.markerText}>{charger.connector_types.length}</Text>
    </View>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  customMarker: {
    backgroundColor: "rgba(255,0,0,0.5)",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarkerSelected: {
    backgroundColor: "rgba(0,255,0,0.5)",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
