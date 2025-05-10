import { ChargerDetails } from "@/constants/Chargers";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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

  const connectorTypeIcons: { [key: string]: any } = {
    "Level 1 DC": require("@/assets/icons/charger1.png"), // Replace with your actual image paths
    "Level 2 DC": require("@/assets/icons/charger1.png"),
    "Normal AC": require("@/assets/icons/charger2.png"),
  };

  const getConnectorIcon = (type: string) => {
    if (type.includes("lvl1")) {
      return connectorTypeIcons["Level 1 DC"];
    }
    if (type.includes("lvl2")) {
      return connectorTypeIcons["Level 2 DC"];
    }
    if (type.includes("normal")) {
      return connectorTypeIcons["Normal AC"];
    }
  };

  const getConnectionText = (type: string) => {
    if (type.includes("lvl1")) {
      return "Level 1 DC";
    }
    if (type.includes("lvl2")) {
      return "Level 2 DC";
    }
    if (type.includes("normal")) {
      return "Normal AC";
    }
  };
  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{charger.name}</Text>
          <Text style={styles.distance}>
            {charger.address} {charger.distance} {charger.distance_metrics}
          </Text>
        </View>
        <View>
          <Image
            source={require("@/assets/icons/navigation.png")}
            style={styles.connectorIcon2}
          />
        </View>
      </View>

      <View style={styles.connectorsSection}>
        <Text style={styles.connectorsTitle}>SUPPORTED CONNECTORS</Text>
        {charger.connector_types.map((type: string, index: number) => {
          console.log("Connector type:", type);
          return (
            <View style={styles.connectorItem} key={index}>
              <Image
                source={getConnectorIcon(type)}
                style={styles.connectorIcon}
              />
              <Text style={styles.connectorText}>
                {getConnectionText(type)}
              </Text>
              <Text style={styles.connectorCount}>x2</Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    width: 300, // Adjust as needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },
  distance: {
    flex: 1,
    color: "#A0A0A0",
    marginBottom: 4,
  },
  connectorsSection: {
    marginTop: 10,
  },
  connectorsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  connectorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  connectorIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  connectorIcon2: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  connectorText: {
    flex: 1,
    color: "#fff",
  },
  connectorCount: {
    color: "#fff",
  },
});

export default ChargerDetailsCard;
