import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundShapes from '../../../components/BackgroundShapes';
import SearchBar from '../../../components/SearchBar';
import VenueDetailCard from '../../../components/VenueDetailCard';
import { Ionicons } from '@expo/vector-icons';

const venues = [
  {
    id: '1',
    name: 'The Beginning',
    location: 'Vashi, Navi Mumbai',
    rating: 4.9,
    vegPrice: '2,000',
    nonVegPrice: '2,000',
    capacity: '100-2000 Pax',
    type: '4 star & above wedding hotels, banquet halls',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
  },
  {
    id: '2',
    name: 'Royal Palace',
    location: 'Andheri West, Mumbai',
    rating: 4.8,
    vegPrice: '2,500',
    nonVegPrice: '3,000',
    capacity: '200-1500 Pax',
    type: 'Luxury wedding venue, garden',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
  },
  {
    id: '3',
    name: 'Green Valley Resort',
    location: 'Thane West, Mumbai',
    rating: 4.7,
    vegPrice: '1,800',
    nonVegPrice: '2,200',
    capacity: '100-800 Pax',
    type: 'Resort, outdoor venue',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  },
];

export default function VenuesScreen() {
  const router = useRouter();

  const handleSearch = (text) => {
    console.log('Searching:', text);
  };

  const handleBack = () => {
    router.back();
  };

  const handleMessage = (venueId) => {
    console.log('Send message to venue:', venueId);
  };

  const handleContact = (venueId) => {
    console.log('View contact for venue:', venueId);
  };

  const handleBookmark = (venueId) => {
    console.log('Bookmark venue:', venueId);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      
      <BackgroundShapes />

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <SearchBar
            placeholder="Search wedding venues"
            onSearch={handleSearch}
            containerStyle={styles.searchBar}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#6B4EFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {venues.map((venue) => (
          <VenueDetailCard
            key={venue.id}
            {...venue}
            onMessage={() => handleMessage(venue.id)}
            onContact={() => handleContact(venue.id)}
            onBookmark={() => handleBookmark(venue.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: StatusBar.currentHeight + 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: {
    flex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollContent: {
    padding: 16,
  },
}); 