import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function VenueDetailCard({
  image,
  name,
  location,
  rating,
  vegPrice,
  nonVegPrice,
  capacity,
  type,
  onPress,
  onBookmark,
  onMessage,
  onContact,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceItem}>
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/vegetarian-food-symbol.png",
                }}
                style={styles.foodIcon}
              />
              <Text style={styles.price}>₹{vegPrice}</Text>
            </View>
            <View style={styles.priceItem}>
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/non-vegetarian-food-symbol.png",
                }}
                style={styles.foodIcon}
              />
              <Text style={styles.price}>₹{nonVegPrice}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.tagText}>{capacity}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="business-outline" size={16} color="#666" />
            <Text style={styles.tagText}>{type}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="business-outline" size={16} color="#666" />
            <Text style={styles.tagText}>{type}</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.messageButton]}
            onPress={onMessage}
          >
            <Text style={styles.messageButtonText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.contactButton]}
            onPress={onContact}
          >
            <Text style={styles.contactButtonText}>View Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmark}>
            <Ionicons name="bookmark-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  ratingContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "column",
    marginBottom: 12,
  },
  priceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  foodIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginRight: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 8,
    marginRight: 8,
    width:"fit-content"
  },
  tagText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 12,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:"100%"
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  messageButton: {
    backgroundColor: "#FF9999",
  },
  contactButton: {
    backgroundColor: "#9999FF",
  },
  messageButtonText: {
    color: "white",
    fontWeight: "600",
  },
  contactButtonText: {
    color: "white",
    fontWeight: "600",
  },
  bookmarkButton: {
    padding: 8,
  },
});
