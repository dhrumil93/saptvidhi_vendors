import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

const trendingData = [
  {
    id: "1",
    tittle: "Wedding Photography",
    subtittle: "Updated 2 years and 4 months ago",
    location: "Vashi, Navi Mumbai",
    fullAddress:
      "Kensville golf & country club, Rajkot - Ahmedabad Highway, Ahmedabad, Gujarat, India",
    image:
      "https://plus.unsplash.com/premium_photo-1681841695231-d674aa32f65b?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    albums: [
      "https://cdn.pixabay.com/photo/2020/12/23/11/18/mykonos-5854670_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/11/21/15/58/wedding-1846114_1280.jpg",
      "https://cdn.pixabay.com/photo/2020/12/23/11/18/mykonos-5854670_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/11/21/15/58/wedding-1846114_1280.jpg",
      "https://cdn.pixabay.com/photo/2020/12/23/11/18/mykonos-5854670_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/11/21/15/58/wedding-1846114_1280.jpg",
    ],
  },
  {
    id: "2",
    tittle: "The First Feet Photography",
    subtittle: "Uploaded 4 Years 2 Months ago",
    location: "Mumbai, Maharashtra",
    fullAddress: "Bandra West, Mumbai, Maharashtra, India",
    image:
      "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    albums: [
      "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083377_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/03/27/20/51/woman-1284029_1280.jpg",
    ],
  },
  {
    id: "3",
    tittle: "Portrait Photography",
    subtittle: "Updated 1 year ago",
    location: "Delhi, India",
    fullAddress: "Connaught Place, New Delhi, India",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    albums: [
      "https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
    ],
  },
];

const TrendingItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.trendingItem} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.trendingImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.tittle}</Text>
        <Text style={styles.subtitle}>{item.subtittle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ServicesPage = () => {
  const handleTrendingPress = (item) => {
    console.log("Pressed trending item:", item.id);
  };

  const handleTagPress = (tag) => {
    console.log("Pressed tag:", tag);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SaptaVidhi Services</Text>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>Card Services</Text>
          <FlatList
            data={trendingData}
            renderItem={({ item }) => (
              <TrendingItem item={item} onPress={handleTrendingPress} />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Featured Photographers Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Photographers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {trendingData.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.featuredImage}
                />
                <Text style={styles.featuredName}>{item.tittle}</Text>
                <Text style={styles.featuredLocation}>{item.location}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Projects Section */}
        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <View style={styles.projectsGrid}>
            {trendingData
              .flatMap((item) =>
                item.albums.slice(0, 2).map((album, index) => (
                  <TouchableOpacity
                    key={`${item.id}-${index}`}
                    style={styles.projectItem}
                  >
                    <Image
                      source={{ uri: album }}
                      style={styles.projectImage}
                    />
                  </TouchableOpacity>
                ))
              )
              .slice(0, 4)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  // Trending Items Styles
  trendingSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginTop: 8,
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  trendingImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  // Photo Tags Styles
  tagsSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingRight: 16,
  },
  tagButton: {
    borderWidth: 1,
    borderColor: "#FF4D8D",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#FF4D8D",
    fontSize: 14,
  },
  // Section Styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  // Featured Photographers Styles
  featuredSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginTop: 8,
  },
  featuredContainer: {
    paddingRight: 16,
  },
  featuredItem: {
    width: 140,
    marginRight: 12,
  },
  featuredImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  featuredLocation: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  // Recent Projects Styles
  projectsSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginTop: 8,
    marginBottom: 16,
  },
  projectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  projectItem: {
    width: "48%",
    marginBottom: 10,
  },
  projectImage: {
    width: "100%",
    height: 120,
    borderRadius: 4,
  },
});

export default ServicesPage;
