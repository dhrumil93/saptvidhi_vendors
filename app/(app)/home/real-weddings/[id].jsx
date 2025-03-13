import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";
// import Header from "../../components/Header";
import PhotoGrid from "./components/PhotoGrid";
import VendorCard from "./components/VendorCard";
import { realWeddingData } from "./data";

const { width: screenWidth } = Dimensions.get("window");

const RealWeddingDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <BackgroundShapes />

      <ScrollView style={styles.content}>
        <Image
          source={{ uri: realWeddingData.coverImage }}
          style={styles.coverImage}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{realWeddingData.title}</Text>
          <Text style={styles.subtitle}>{realWeddingData.subtitle}</Text>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.locationText}>{realWeddingData.location}</Text>
            <View style={styles.dateDivider} />
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.dateText}>{realWeddingData.date}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wedding Photos</Text>
          <PhotoGrid photos={realWeddingData.photos} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vendors</Text>
          {realWeddingData.vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onPress={() => router.push(`/vendors/${vendor.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
  },
  coverImage: {
    width: screenWidth,
    height: screenWidth * 0.7,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  dateDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#DDD",
    marginHorizontal: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
});

export default RealWeddingDetails;
