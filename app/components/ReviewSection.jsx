import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ReviewsSection = () => {
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: "Saathil",
      rating: 4,
      date: "5 years 3 month ago",
      content:
        "I bought the Blueberry Bites and my dog loves it so much! Aside from being delicious it's also healthy! Great Buy!",
    },
    {
      id: 2,
      user: "Saathil",
      rating: 4,
      date: "5 years 3 month ago",
      content:
        "I bought the Blueberry Bites and my dog loves it so much! Aside from being delicious it's also healthy! Great Buy!",
    },
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewUserContainer}>
          <View style={styles.reviewAvatar}>
            <Text style={styles.reviewAvatarText}>{item.user.charAt(0)}</Text>
          </View>
          <View style={styles.reviewUserInfo}>
            <Text style={styles.reviewUsername}>{item.user}</Text>
            <Text style={styles.reviewDate}>Reviewed {item.date}</Text>
          </View>
        </View>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name="star"
              size={16}
              color={star <= item.rating ? "#FFB800" : "#E5E5E5"}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <Text style={styles.reviewsUpdated}>Updated on 15 Feb 2019</Text>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.reviewDivider} />}
      />

      <TouchableOpacity style={styles.viewAllReviewsButton}>
        <Text style={styles.viewAllReviewsText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#FFF",
    // marginBottom: 16,
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
  reviewsUpdated: {
    fontSize: 12,
    color: "#888",
    paddingTop: 16,
  },
  reviewItem: {
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewUserContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  reviewAvatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUsername: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: "#EEE",
  },
  viewAllReviewsButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  viewAllReviewsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});

export default ReviewsSection;