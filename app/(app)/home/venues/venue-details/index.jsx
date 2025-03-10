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
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import VenueDetailCard from "../../../../components/VenueDetailCard";
import { venues } from "../../../../data/venues";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    return null; // Or show an error state
  }

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity style={styles.albumItem}>
      <Image source={{ uri: item }} style={styles.albumImage} />
    </TouchableOpacity>
  );

  // Sample reviews data (you can move this to your data file)
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

  // FAQ data
  const faqs = [
    {
      id: 1,
      question:
        "Does Club Mahindra Kensville Golf Resort allow small size gatherings (<100) ?",
      answer: "Less than 50 Pax allowed",
    },
    {
      id: 2,
      question:
        "What is Club Mahindra Kensville Golf Resort's policy on catering?",
      answer: "Less than 50 Pax allowed",
    },
    {
      id: 3,
      question:
        "What is Club Mahindra Kensville Golf Resort's policy on decor?",
      answer: "Less than 50 Pax allowed",
    },
    {
      id: 4,
      question:
        "Is outside alcohol permitted at Club Mahindra Kensville Golf Resort?",
      answer: "Less than 50 Pax allowed",
    },
    {
      id: 5,
      question: "What is Club Mahindra Kensville Golf Resort's policy on DJ?",
      answer: "Less than 50 Pax allowed",
    },
  ];

  // Similar venues data
  const similarVenues = [
    {
      id: "sv1",
      name: "Luxury Banquet Hall",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2296&q=80",
      rating: 4.9,
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

  const renderFaqItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
      <View style={styles.faqDivider} />
    </View>
  );

  const renderSimilarVenueItem = ({ item }) => (
    <TouchableOpacity style={styles.similarVenueItem}>
      <Image source={{ uri: item.image }} style={styles.similarVenueImage} />
      <View style={styles.similarVenueRatingContainer}>
        <AntDesign name="star" size={12} color="#FFB800" />
        <Text style={styles.similarVenueRating}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

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
          <Image source={{ uri: venue.image }} style={styles.image} />
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

        <View style={styles.headerContainer}>
          <Text style={styles.title}>{venue.name}</Text>
          <Text style={styles.subtitle}>
            {venue.formerName && `(Formerly known as ${venue.formerName})`}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={16}
                  color={star <= venue.rating ? "#FFB800" : "#E5E5E5"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {venue.rating} ({venue.reviewCount} Reviews)
            </Text>
          </View>

          <Text style={styles.location}>{venue.location}</Text>
          <Text style={styles.fullAddress}>{venue.fullAddress}</Text>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="mail-outline" size={20} color="#fff" />
              <Text style={styles.messageButtonText}>Send Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call-outline" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>View Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>About</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.aboutInfoRow}>
            <View style={styles.aboutInfoItem}>
              <View style={styles.infoIconContainer}>
                <AntDesign name="calendar" size={20} color="#666" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Been on</Text>
                <Text style={styles.infoValue}>Saptavishi Since 4 Years</Text>
              </View>
            </View>

            <View style={styles.aboutInfoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="car-outline" size={20} color="#666" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Parking</Text>
                <Text style={styles.infoValue}>Starting Price/room</Text>
              </View>
            </View>
          </View>

          <View style={styles.aboutInfoRow}>
            <View style={styles.aboutInfoItem}>
              <View style={styles.infoIconContainer}>
                <MaterialIcons name="date-range" size={20} color="#666" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Start of Venue</Text>
                <Text style={styles.infoValue}>2011</Text>
              </View>
            </View>

            <View style={styles.aboutInfoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="people-outline" size={20} color="#666" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Small Party Venue</Text>
                <Text style={styles.infoValue}>Less than 50 pax allowed</Text>
              </View>
            </View>
          </View>

          <View style={styles.aboutInfoRow}>
            <View style={styles.aboutInfoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="location-outline" size={20} color="#666" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Space</Text>
                <Text style={styles.infoValue}>Indoor, Outdoor, Poolside</Text>
              </View>
            </View>
          </View>

          <Text style={styles.aboutDescription}>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </Text>

          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pricing Info</Text>

          <View style={styles.pricingRow}>
            <View style={styles.priceIconContainer}>
              <Ionicons name="bed-outline" size={20} color="#666" />
            </View>
            <Text style={styles.priceValue}>₹ {venue.startingPrice}</Text>
            <Text style={styles.priceLabel}>Starting Price/room</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pricingRow}>
            <View style={styles.priceIconContainer}>
              <Ionicons name="restaurant-outline" size={20} color="#666" />
            </View>
            <Text style={styles.priceValue}>₹ {venue.vegPrice}</Text>
            <View style={styles.priceTypeContainer}>
              <View style={styles.vegIndicator} />
              <Text style={styles.priceLabel}>Veg/plate</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.pricingRow}>
            <View style={styles.priceIconContainer}>
              <Ionicons name="restaurant-outline" size={20} color="#666" />
            </View>
            <Text style={styles.priceValue}>₹ {venue.nonVegPrice}</Text>
            <View style={styles.priceTypeContainer}>
              <View style={styles.nonVegIndicator} />
              <Text style={styles.priceLabel}>Non Veg/plate</Text>
            </View>
          </View>
        </View>
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
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Areas Available</Text>

          <View style={styles.areaRow}>
            <View style={styles.areaIconContainer}>
              <MaterialIcons name="location-city" size={24} color="#666" />
            </View>
            <View style={styles.areaDetails}>
              <Text style={styles.areaCapacity}>
                {venue.seatingCapacity} Seating | {venue.floatingCapacity}{" "}
                Floating
              </Text>
              <Text style={styles.areaDescription}>Lawn + Hall</Text>
              <Text style={styles.areaType}>Indoor & Outdoor</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.areaRow}>
            <View style={styles.areaIconContainer}>
              <MaterialIcons name="location-city" size={24} color="#666" />
            </View>
            <View style={styles.areaDetails}>
              <Text style={styles.areaCapacity}>
                {venue.alternateSeatingCapacity} Seating |{" "}
                {venue.alternateFloatingCapacity} Floating
              </Text>
              <Text style={styles.areaDescription}>Lawn + Hall</Text>
              <Text style={styles.areaType}>Indoor & Outdoor</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
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

        {/* FAQ Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.venueHeaderContainer}>
            <Text style={styles.venueHeaderTitle}>
              Club Mahindra Kensville Golf Resort, Ahmedabad
            </Text>
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

        {/* Similar Vendors Section */}
        <View style={styles.similiarContainer}>
        {venues.map((venue) => (
                  <VenueDetailCard
                    {...venue}
                    key={venue.id}
                    onPress={() => handleVenuePress(venue)}
                    onMessage={() => handleMessage(venue.id)}
                    onContact={() => handleContact(venue.id)}
                    onBookmark={() => handleBookmark(venue.id)}
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
    // padding:16
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
  headerContainer: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  fullAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingStars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  messageButton: {
    backgroundColor: "#FF7A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  messageButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  contactButton: {
    backgroundColor: "#8E64FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  contactButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  sectionContainer: {
    backgroundColor: "#FFF",
    marginBottom: 16,
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
  viewAllButton: {
    padding: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#8E64FF",
    fontWeight: "500",
  },
  aboutInfoRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  aboutInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  infoValue: {
    fontSize: 13,
    color: "#666",
  },
  aboutDescription: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  readMoreButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  priceIconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginLeft: 8,
  },
  priceTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  nonVegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#FF5252",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginLeft: 54,
  },
  areaRow: {
    flexDirection: "row",
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  areaIconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  areaDetails: {
    flex: 1,
    marginLeft: 12,
  },
  areaCapacity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  areaDescription: {
    fontSize: 14,
    color: "#666",
  },
  areaType: {
    fontSize: 14,
    color: "#888",
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
  // Review section styles
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
  // FAQ Section styles
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
  // Similar Vendors section
  similarVenuesContainer: {
    paddingHorizontal: 16,
  },
  similarVenueItem: {
    width: width * 0.65,
    height: width * 0.4,
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  similarVenueImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  similarVenueRatingContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  similarVenueRating: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  similiarContainer:{
    marginRight:16,
    marginLeft:16,
  }
});
