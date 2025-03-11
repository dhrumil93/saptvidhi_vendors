import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { trendings } from "../../../../data/trending";
import HeaderSection from "../../../../components/trending/headerSection.jsx";
import AlbumsSection from "../../../../components/trending/AlbumSection.jsx";
import TrendingCard from "../../../../components/trendingCard";
import PhotoTagsection from "../../../../components/trending/PhotoTagSection.jsx";

const { width } = Dimensions.get("window");

export default function TrendingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const trending = trendings.find((t) => t.id === id);

  if (!trending) {
    return null; // Or show an error state
  }

  const handletrendingPress = (trending) => {
    // Handle trendingpress
  };

  const handleMessage = (id) => {
    // Handle message
  };

  const handleContact = (id) => {
    // Handle contact
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
          <Image source={{ uri: trending.image }} style={styles.image} />
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

        <HeaderSection trending={trending} />
        <PhotoTagsection trending={trending} />
        <AlbumsSection trending={trending} />
        <Text style={styles.sectionTitle}>Related Features</Text>
        {/* Similar Vendors Section */}
        <View style={styles.similiarContainer}>
          {trendings.map((trending) => (
            <TrendingCard
              {...trending}
              key={trending.id}
              onPress={() => handletrendingPress(trending)}
              onMessage={() => handleMessage(trending.id)}
              onContact={() => handleContact(trending.id)}
              onBookmark={() => handleBookmark(trending.id)}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    padding: 16,
    paddingBottom: 8,
  },
  similiarContainer: {
    marginRight: 16,
    marginLeft: 16,
  },
});
