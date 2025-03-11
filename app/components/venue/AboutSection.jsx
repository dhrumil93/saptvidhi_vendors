import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const AboutSection = ({ venue }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutInfoRow}>
        <View style={styles.aboutInfoItem}>
          <View style={styles.infoIconContainer}>
            <AntDesign name="calendar" size={20} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Been on</Text>
            <Text style={styles.infoValue}>Saptavishi Since 4 Years</Text>
          </View>
        </View>

        <View style={styles.aboutInfoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="car-outline" size={20} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Parking</Text>
            <Text style={styles.infoValue}>Starting Price/room</Text>
          </View>
        </View>
      </View>

      <View style={styles.aboutInfoRow}>
        <View style={styles.aboutInfoItem}>
          <View style={styles.infoIconContainer}>
            <MaterialIcons name="date-range" size={20} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Start of Venue</Text>
            <Text style={styles.infoValue}>2011</Text>
          </View>
        </View>

        <View style={styles.aboutInfoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="people-outline" size={20} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Small Party Venue</Text>
            <Text style={styles.infoValue}>Less than 50 pax allowed</Text>
          </View>
        </View>
      </View>

      <View style={styles.aboutInfoRow}>
        <View style={styles.aboutInfoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="location-outline" size={20} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Space</Text>
            <Text style={styles.infoValue}>Indoor, Outdoor, Poolside</Text>
          </View>
        </View>
      </View>

      <Text style={styles.aboutDescription}>
        Lorem ipsum is placeholder text commonly used in the graphic, print,
        and publishing industries for previewing layouts and visual mockups.
      </Text>

      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
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
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    padding: 16,
    paddingBottom: 8,
  },
  viewAllButton: {
    padding: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#8E64FF",
    fontWeight: "500",
  },
  aboutInfoRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  aboutInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  infoValue: {
    fontSize: 13,
    color: "#666",
  },
  aboutDescription: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  readMoreButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});

export default AboutSection;