import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const Header = ({ location, onLocationPress, onMenuPress, onSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLocationPress}
          style={styles.locationButton}
        >
          <Text style={styles.location}>{location}</Text>
          <Ionicons name="chevron-down" size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      <SearchBar onSearch={onSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  menuButton: {
    padding: 4,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8B5CF6",
    marginRight: 4,
  },
});

export default Header;
