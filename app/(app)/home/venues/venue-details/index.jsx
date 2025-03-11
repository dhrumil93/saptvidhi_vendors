import React from "react";
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import VenueDetailCard from "../../../../components/VenueDetailCard";
import { venues } from "../../../../data/venues";
import venueFAQs from "../../../../data/venueFAQs";
import HeaderSection from "../../../../components/headerSection";
import AboutSection from "../../../../components/AboutSection";
import PricingSection from "../../../../components/PricingSection.jsx";
import AlbumsSection from "../../../../components/AlbumSection";
import AreasSection from "../../../../components/AreaSection";
import ReviewsSection from "../../../../components/ReviewSection";
import FaqSection from "../../../../components/FaqSection";

const { width } = Dimensions.get("window");

export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    return null; // Or show an error state
  }

  const handleVenuePress = (venue) => {
    // Handle venue press
  };

  const handleMessage = (id) => {
    // Handle message
  };

  const handleContact = (id) => {
    // Handle contact
  };

  const handleBookmark = (id) => {
    // Handle bookmark
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView style={styles.scrollView}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: venue.image }} style={styles.image} />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="left" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="share-alt" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="bookmark-o" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <HeaderSection venue={venue} />
        <AboutSection venue={venue} />
        <PricingSection venue={venue} />
        <AlbumsSection venue={venue} />
        <AreasSection venue={venue} />
        <ReviewsSection />
        <FaqSection faqs={venueFAQs} />

        {/* Similar Vendors Section */}
        <View style={styles.similiarContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: width * 0.7,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  backButton: {
    position: "absolute",
    top: StatusBar.currentHeight + 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonsContainer: {
    position: "absolute",
    top: StatusBar.currentHeight + 16,
    right: 16,
    flexDirection: "row",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  similiarContainer: {
    marginRight: 16,
    marginLeft: 16,
  }
});