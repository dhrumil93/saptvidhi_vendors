import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import VendorCategoryCard from '../../../components/VendorCategoryCard';
import BackgroundShapes from '../../../components/BackgroundShapes';
import SearchBar from '../../../components/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

const vendorCategories = [
  {
    id: '1',
    title: 'Venues',
    subtitle: ['Lawns / Farm House', 'Banquet Halls'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
  },
  {
    id: '2',
    title: 'Photographers',
    subtitle: ['Wedding Photography', 'Pre-Wedding Shoot'],
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
  },
  {
    id: '3',
    title: 'Makeup',
    subtitle: ['Bridal Makeup', 'Family Makeup'],
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
  },
  {
    id: '4',
    title: 'Pre Wedding Shoot',
    subtitle: ['Outdoor Shoot', 'Studio Shoot'],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  },
  {
    id: '5',
    title: 'Wedding Planning',
    subtitle: ['Full Planning', 'Partial Planning'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  },
];

export default function VendorCategories() {
  const router = useRouter();

  const handleSearch = (text) => {
    console.log('Searching:', text);
  };

  const handleCategoryPress = (category) => {
    router.push(`/vendors/${category.id}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      
      <BackgroundShapes />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="left" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vendor Categories</Text>
          <View style={styles.placeholder} />
        </View>
        <SearchBar
          placeholder="Search Vendors Categories"
          onSearch={handleSearch}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {vendorCategories.map((category) => (
          <VendorCategoryCard
            key={category.id}
            {...category}
            onPress={() => handleCategoryPress(category)}
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
  },
}); 