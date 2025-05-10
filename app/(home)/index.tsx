import React from "react";
import { StyleSheet } from "react-native";

import HomePage from "@/components/ui/HomePage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomePage />
    </SafeAreaView>
  );
}

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
    left: 0,
    bottom: 0,
  },
});
