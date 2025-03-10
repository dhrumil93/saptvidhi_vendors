import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import BackgroundShapes from "../../../components/BackgroundShapes";
import SearchBar from "../../../components/SearchBar";
import VenueDetailCard from "../../../components/VenueDetailCard";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { venues } from "../../../../data/venues";

export default function VenuesScreen() {
  const router = useRouter();

  const handleSearch = (text) => {
    console.log("Searching:", text);
  };

  const handleBack = () => {
    router.back();
  };

  const handleMessage = (venueId) => {
    console.log("Send message to venue:", venueId);
  };

  const handleContact = (venueId) => {
    console.log("View contact for venue:", venueId);
  };

  const handleBookmark = (venueId) => {
    console.log("Bookmark venue:", venueId);
  };

  const handleVenuePress = (venue) => {
    router.push({
      pathname: "/(app)/home/venues/venue-details",
      params: { id: venue.id },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <BackgroundShapes />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="left" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Venues</Text>
          <View style={styles.placeholder} />
        </View>

        <SearchBar
          placeholder="Search wedding venues"
          onSearch={handleSearch}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {venues.map((venue) => (
          <VenueDetailCard
            {...venue}
            key={venue.id}
            onPress={() => handleVenuePress(venue)}
            onMessage={() => handleMessage(venue.id)}
            onContact={() => handleContact(venue.id)}
            onBookmark={() => handleBookmark(venue.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: StatusBar.currentHeight + 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },

  placeholder: {
    width: 40,
  },

  scrollContent: {
    padding: 16,
  },
});
