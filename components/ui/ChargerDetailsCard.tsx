import { ChargerDetails } from "@/constants/Chargers";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ChargerDetailsCardProps {
  charger: any; // Replace 'any' with your ChargerDetails type if available
  onPress: (charger: ChargerDetails) => void;
}

const ChargerDetailsCard: React.FC<ChargerDetailsCardProps> = ({
  charger,
  onPress,
}) => {
  const handlePress = () => {
    // Handle the press event here
    console.log("Charger pressed:", charger);
    onPress(charger); // Call the onPress function passed as a prop
  };
  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.title}>{charger.name}</Text>
      <Text style={styles.address}>{charger.address}</Text>
      <Text>
        Distance: {charger.distance} {charger.distance_metrics}
      </Text>
      <Text>Connector Types: {charger.connector_types.join(", ")}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    width: 300, // Adjust as needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    color: "gray",
    marginBottom: 4,
  },
});

export default ChargerDetailsCard;
