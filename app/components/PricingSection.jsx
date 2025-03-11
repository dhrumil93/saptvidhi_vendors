import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PricingSection = ({ venue }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Pricing Info</Text>

      <View style={styles.pricingRow}>
        <View style={styles.priceIconContainer}>
          <Ionicons name="bed-outline" size={20} color="#666" />
        </View>
        <Text style={styles.priceValue}>₹ {venue.startingPrice}</Text>
        <Text style={styles.priceLabel}>Starting Price/room</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.pricingRow}>
        <View style={styles.priceIconContainer}>
          <Ionicons name="restaurant-outline" size={20} color="#666" />
        </View>
        <Text style={styles.priceValue}>₹ {venue.vegPrice}</Text>
        <View style={styles.priceTypeContainer}>
          <View style={styles.vegIndicator} />
          <Text style={styles.priceLabel}>Veg/plate</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.pricingRow}>
        <View style={styles.priceIconContainer}>
          <Ionicons name="restaurant-outline" size={20} color="#666" />
        </View>
        <Text style={styles.priceValue}>₹ {venue.nonVegPrice}</Text>
        <View style={styles.priceTypeContainer}>
          <View style={styles.nonVegIndicator} />
          <Text style={styles.priceLabel}>Non Veg/plate</Text>
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
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  priceIconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginLeft: 8,
  },
  priceTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  nonVegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#FF5252",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginLeft: 54,
  },
});

export default PricingSection;