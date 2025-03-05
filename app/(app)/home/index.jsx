import React from "react";
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

const categories = [
  {
    id: "1",
    title: "Wedding Photos",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  },
  {
    id: "2",
    title: "Bridal Makeup",
    image:
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500&q=80",
  },
  {
    id: "3",
    title: "Wedding Photography",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
  },
  {
    id: "4",
    title: "Wedding Decorations",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80",
  },
];

const venues = [
  {
    id: "1",
    name: "VLCC",
    location: "Ahmedabad",
    price: "1500",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  },
  {
    id: "2",
    name: "VLCC",
    location: "Ahmedabad",
    price: "1500",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  },
];

const makeupArtists = [
  {
    id: "1",
    name: "Pristine Makeovers",
    location: "Ahmedabad",
    price: "1500",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500&q=80",
  },
  {
    id: "2",
    name: "Pristine Makeovers",
    location: "Ahmedabad",
    price: "1500",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500&q=80",
  },
];

const collections = [
  {
    id: "1",
    title: "Luxury Wedding Venues",
    subtitle: "15 Vendors",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
  },
  {
    id: "2",
    title: "Luxury Wedding Venues",
    subtitle: "15 Vendors",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
  },
  {
    id: "3",
    title: "Luxury Wedding Venues",
    subtitle: "15 Vendors",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
  },
];

const trendingItems = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=500&q=80",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1458538977777-0549b2370168?w=500&q=80",
  },
];

const services = [
  {
    id: "1",
    title: "Wedsta",
    description: "SaptaVidhi at Home Family Makeup Services",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  },
  {
    id: "2",
    title: "Cards Services",
    description: "Plan your dream wedding in digits",
    image:
      "https://images.unsplash.com/photo-1511184059754-e4b5c2c0e1a2?w=500&q=80",
  },
  {
    id: "3",
    title: "Venue Booking Services",
    description: "Best price guaranteed",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
  },
];

const weddingIdeas = [
  {
    id: "1",
    title: "Wedding day bridal portrait",
    image:
      "https://images.unsplash.com/photo-1595555785741-7d3efc6957d7?w=500&q=80",
  },
  {
    id: "2",
    title: "Romantic couple shot",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
  },
];

const realWeddings = [
  {
    id: "1",
    coupleName: "Niyati & Kunj",
    location: "ahmedabad",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
  },
  {
    id: "2",
    coupleName: "Niyati & Kunj",
    location: "ahmedabad",
    image:
      "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?w=500&q=80",
  },
  {
    id: "3",
    coupleName: "Niyati & Kunj",
    location: "ahmedabad",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
  },
  {
    id: "4",
    coupleName: "Niyati & Kunj",
    location: "ahmedabad",
    image:
      "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?w=500&q=80",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <BackgroundShapes />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Header
          location="Ahmedabad"
          onLocationPress={() => {}}
          onMenuPress={() => {}}
        />

        <View style={styles.content}>
          <View style={styles.carouselContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
              }}
              style={styles.carouselImage}
            />
            <View style={styles.paginationDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Categories" onViewAll={() => {}} />
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
                  onPress={() => {}}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: StatusBar.currentHeight || 0,
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
