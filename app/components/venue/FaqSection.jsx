import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const FAQSection = ({ faqs, venueName }) => {
  const renderFaqItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
      <View style={styles.faqDivider} />
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.venueHeaderContainer}>
        <Text style={styles.venueHeaderTitle}>{venueName}</Text>
      </View>

      <FlatList
        data={faqs}
        renderItem={renderFaqItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.viewAllButton}>
        <View style={styles.viewAllContainer}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#FFF",
    // marginBottom: 16,
    // paddingTop: 8,
    paddingBottom: 8,
  },
  venueHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  venueHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  faqItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  faqDivider: {
    height: 1,
    backgroundColor: "#EEE",
    marginTop: 8,
  },
  viewAllButton: {
    padding: 8,
  },
  viewAllContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});

export default FAQSection;