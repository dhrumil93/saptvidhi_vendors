import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const HeaderSection = ({ venue }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{venue.name}</Text>
      <Text style={styles.subtitle}>
        {venue.formerName && `(Formerly known as ${venue.formerName})`}
      </Text>

      <View style={styles.ratingContainer}>
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name="star"
              size={16}
              color={star <= venue.rating ? "#FFB800" : "#E5E5E5"}
            />
          ))}
        </View>
        <Text style={styles.ratingText}>
          {venue.rating} ({venue.reviewCount} Reviews)
        </Text>
      </View>

      <Text style={styles.location}>{venue.location}</Text>
      <Text style={styles.fullAddress}>{venue.fullAddress}</Text>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.messageButtonText}>Send Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>View Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  fullAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingStars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  messageButton: {
    backgroundColor: "#FF7A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  messageButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  contactButton: {
    backgroundColor: "#8E64FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  contactButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
});

export default HeaderSection;