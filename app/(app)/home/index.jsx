import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import BackgroundShapes from "../../components/BackgroundShapes";
import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";
import PlanningTools from "../../components/PlanningTools";
import VenueListCard from "../../components/VenueListCard";
import MakeupArtistCard from "../../components/MakeupArtistCard";
import CollectionCard from "../../components/CollectionCard";
import ServiceCard from "../../components/ServiceCard";
import WeddingIdeaCard from "../../components/WeddingIdeaCard";
import SectionHeader from "../../components/SectionHeader";
import RealWeddingCard from "../../components/RealWeddingCard";
import { useRouter } from 'expo-router';

import {
  categories,
  venues,
  makeupArtists,
  collections,
  trendingItems,
  services,
  weddingIdeas,
  realWeddings,
  carouselImages,
} from "../../data/homeData";

export default function HomeScreen() {
  const router = useRouter();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (text) => {
    console.log("Searching:", text);
  };

  const handleViewAllCategories = () => {
    router.push('home/vendor-categories');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <BackgroundShapes />

      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <Header
          location="Ahmedabad"
          onLocationPress={() => {}}
          onMenuPress={() => {}}
          onSearch={handleSearch}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <View style={styles.carouselContainer}>
            <Image
              source={{
                uri: carouselImages[currentCarouselIndex].image,
              }}
              style={styles.carouselImage}
            />
            <View style={styles.paginationDots}>
              {carouselImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentCarouselIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Categories" onViewAll={handleViewAllCategories} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalListContent}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  image={category.image}
                  onPress={handleViewAllCategories}
                />
              ))}
            </ScrollView>
          </View>

          <PlanningTools />

          <View style={styles.section}>
            <SectionHeader title="Venues in your city" onViewAll={() => {}} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalListContent}
            >
              {venues.map((venue) => (
                <VenueListCard key={venue.id} {...venue} onPress={() => {}} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Bridal Makeup for You" onViewAll={() => {}} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalListContent}
            >
              {makeupArtists.map((artist) => (
                <MakeupArtistCard
                  key={artist.id}
                  {...artist}
                  onPress={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Venues Collection in Ahmedabad"
              onViewAll={() => {}}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalListContent}
            >
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  {...collection}
                  onPress={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Trending Today" onViewAll={() => {}} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalListContent}
            >
              {trendingItems.map((item) => (
                <Image
                  key={item.id}
                  source={{ uri: item.image }}
                  style={styles.trendingImage}
                />
              ))}
            </ScrollView>
          </View>

          <View style={[styles.section, styles.lastSection]}>
            <SectionHeader title="SaptaVidhi Services" onViewAll={() => {}} />
            <View style={styles.servicesGrid}>
              {services.map((service) => (
                <ServiceCard key={service.id} {...service} onPress={() => {}} />
              ))}
            </View>
            <View style={styles.section}>
              <SectionHeader title="Wedding Ideas" onViewAll={() => {}} />

              <View style={styles.weddingIdeasGrid}>
                {weddingIdeas.map((idea) => (
                  <WeddingIdeaCard key={idea.id} {...idea} onPress={() => {}} />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Featured Video" />
              <View style={styles.featuredVideoContainer}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
                  }}
                  style={styles.featuredVideo}
                  resizeMode="cover"
                />
              </View>
            </View>

            <View style={[styles.section, styles.lastSection]}>
              <SectionHeader title="Real Weddings We Love" />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                contentContainerStyle={styles.horizontalListContent}
              >
                {realWeddings.map((wedding) => (
                  <RealWeddingCard
                    key={wedding.id}
                    {...wedding}
                    onPress={() => {}}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollView: {
    flex: 1,
    marginTop: (StatusBar.currentHeight || 0) + 110, // Adjusted for header + search bar height
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 0,
  },
  horizontalList: {
    paddingLeft: 16,
  },
  horizontalListContent: {
    paddingRight: 16,
  },
  carouselContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#8B5CF6",
  },
  trendingImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginRight: 16,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: "#666",
  },
  weddingIdeasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  featuredVideoContainer: {
    marginHorizontal: 16,
  },
  featuredVideo: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
});
