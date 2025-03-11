import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const AlbumsSection = ({ venue }) => {
  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity style={styles.albumItem}>
      <Image source={{ uri: item }} style={styles.albumImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Albums</Text>
      <View style={styles.albumsContainer}>
        <FlatList
          data={venue.albums}
          renderItem={renderAlbumItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
      <TouchableOpacity style={styles.viewAllReviewsButton}>
        <Text style={styles.viewAllReviewsText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#FFF",
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    padding: 16,
    paddingBottom: 8,
  },
  albumsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  albumItem: {
    width: (width - 48) / 3,
    height: (width - 48) / 3,
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  albumImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

export default AlbumsSection;
