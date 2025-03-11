import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PhotoTags = ({ trending, onTagPress }) => {
  // Assuming trending.tags contains the array of photo tags
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Photo Tags</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {trending.tags.map((tag, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.tagButton}
            onPress={() => onTagPress(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingRight: 16,
  },
  tagButton: {
    borderWidth: 1,
    borderColor: '#FF4D8D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FF4D8D',
    fontSize: 14,
  }
});

export default PhotoTags;