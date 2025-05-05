import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";
import Header from "../../../components/Header";
import { packages, latestWork } from "./data";

const PackageCard = ({ package: pkg }) => (
  <View style={styles.packageCard}>
    <Text style={styles.packageTitle}>{pkg.title}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>₹{pkg.price}</Text>
      <Text style={styles.perPerson}>/person</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Services :</Text>
      {pkg.services.map((service, index) => (
        <View key={index} style={styles.serviceRow}>
          <Ionicons
            name={service.included ? "checkmark-circle" : "remove-circle"}
            size={20}
            color={service.included ? "#FF4D8D" : "#999"}
          />
          <Text
            style={[
              styles.serviceText,
              !service.included && styles.disabledText,
            ]}
          >
            {service.name}
          </Text>
        </View>
      ))}
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Artist Experience :</Text>
      <Text style={styles.sectionText}>{pkg.experience}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Products :</Text>
      <Text style={styles.sectionText}>{pkg.products}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gallery :</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {pkg.gallery.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    </View>

    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
);

const WorkCard = ({ item }) => (
  <View style={styles.workCard}>
    <Image source={{ uri: item.image }} style={styles.workImage} />
    <View style={styles.workInfo}>
      <Text style={styles.workTitle}>{item.title}</Text>
      <Text style={styles.workSubtitle}>{item.subtitle}</Text>
      <Text style={styles.workDate}>{item.date}</Text>
    </View>
  </View>
);

const BridalPackagesScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleViewCart = () => {
    router.push("/cart"); // Add your cart route
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <BackgroundShapes />

      <View style={styles.headerContainer}>
        <Header
          location="Packages"
          onLocationPress={() => {}}
          onMenuPress={() => {}}
          onSearch={() => {}}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Package</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
          <Ionicons name="cart-outline" size={24} color="#FF4D8D" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Packages Section */}
        <View style={styles.section}>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </View>

        {/* Latest Work Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our latest work</Text>

          {/* Category Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryFilters}
          >
            {latestWork.categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.type &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.type)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.type &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category.name} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Work Grid */}
          <View style={styles.workGrid}>
            {latestWork.albums
              .filter(
                (item) =>
                  selectedCategory === "all" || item.type === selectedCategory
              )
              .map((item) => (
                <WorkCard key={item.id} item={item} />
              ))}
          </View>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  packageCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  packageTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4D8D",
  },
  perPerson: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  disabledText: {
    color: "#999",
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
  },
  galleryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#FF4D8D",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  cartButton: {
    padding: 8,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF4D8D",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryFilters: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  categoryButtonActive: {
    backgroundColor: "#FF4D8D",
  },
  categoryText: {
    color: "#666",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#FFF",
  },
  workGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  workCard: {
    width: "48%",
    marginBottom: 16,
  },
  workImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  workInfo: {
    marginTop: 8,
  },
  workTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  workSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  workDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default BridalPackagesScreen;
