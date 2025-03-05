import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
      <TextInput
        placeholder="Search photos vendors"
        style={styles.searchInput}
        placeholderTextColor="#94A3B8"
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
    paddingVertical: 8,
  },
});

export default SearchBar; 