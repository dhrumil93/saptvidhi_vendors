import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AreasSection = ({ venue }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Areas Available</Text>

      <View style={styles.areaRow}>
        <View style={styles.areaIconContainer}>
          <MaterialIcons name="location-city" size={24} color="#666" />
        </View>
        <View style={styles.areaDetails}>
          <Text style={styles.areaCapacity}>
            {venue.seatingCapacity} Seating | {venue.floatingCapacity} Floating
          </Text>
          <Text style={styles.areaDescription}>Lawn + Hall</Text>
          <Text style={styles.areaType}>Indoor & Outdoor</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.areaRow}>
        <View style={styles.areaIconContainer}>
          <MaterialIcons name="location-city" size={24} color="#666" />
        </View>
        <View style={styles.areaDetails}>
          <Text style={styles.areaCapacity}>
            {venue.alternateSeatingCapacity} Seating | {venue.alternateFloatingCapacity} Floating
          </Text>
          <Text style={styles.areaDescription}>Lawn + Hall</Text>
          <Text style={styles.areaType}>Indoor & Outdoor</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#FFF",
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    padding: 16,
    paddingBottom: 8,
  },
  areaRow: {
    flexDirection: "row",
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  areaIconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  areaDetails: {
    flex: 1,
    marginLeft: 12,
  },
  areaCapacity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  areaDescription: {
    fontSize: 14,
    color: "#666",
  },
  areaType: {
    fontSize: 14,
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginLeft: 54,
  },
});

export default AreasSection;