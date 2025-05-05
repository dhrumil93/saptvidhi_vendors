import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const MOCK_VENUES = [
  {
    id: '1',
    name: 'Royal Wedding Palace',
    location: 'Vashi, Navi Mumbai',
    price: '₹2,000 - ₹5,000',
    rating: 4.5,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    status: 'active'
  },
  {
    id: '2',
    name: 'Green Valley Resort',
    location: 'Thane West',
    price: '₹3,000 - ₹8,000',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    status: 'pending'
  },
];

export default function VenuesScreen() {
  const router = useRouter();

  const renderVenueCard = (venue) => (
    <TouchableOpacity 
      key={venue.id}
      style={styles.venueCard}
      onPress={() => router.push(`/(app)/more/venues/${venue.id}`)}
    >
      <Image source={{ uri: venue.image }} style={styles.venueImage} />
      <View style={styles.venueContent}>
        <View style={styles.venueHeader}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <View style={[
            styles.statusBadge,
            venue.status === 'active' ? styles.activeBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>
              {venue.status === 'active' ? 'Active' : 'Pending'}
            </Text>
          </View>
        </View>
        
        <View style={styles.venueInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.locationText}>{venue.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="cash" size={16} color="#666" />
            <Text style={styles.priceText}>{venue.price}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingText}>{venue.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({venue.reviews} reviews)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackgroundShapes />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>My Venues</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/(app)/more/venues/add')}
        >
          <Ionicons name="add" size={24} color="#FF69B4" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_VENUES.map(renderVenueCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  venueCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden'
  },
  venueImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  venueContent: {
    padding: 16,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  venueInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  }
});