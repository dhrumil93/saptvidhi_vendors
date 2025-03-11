import React from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import TrendingCard from "../../../components/trendingCard";
import BackgroundShapes from "../../../components/BackgroundShapes";
import SearchBar from "../../../components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { trendings } from "../../../data/trending";

export default function TrendingFeatures() {
  const router = useRouter();

  const handleSearch = (text) => {
    console.log("Searching:", text);
  };

  const handleTrendingPress = (trending) => {
    router.push({
      pathname: "/(app)/home/trending/trending-details",
      params: { id: trending.id },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <BackgroundShapes />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="left" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trendings</Text>
          <View style={styles.placeholder} />
        </View>
        <SearchBar
          placeholder="Search Vendors Categories"
          onSearch={handleSearch}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {trendings.map((trending) => (
          <TrendingCard
            key={trending.id}
            {...trending}
            onPress={() => handleTrendingPress(trending)}
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
