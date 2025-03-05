import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WeddingIdeaCard = ({ 
  image, 
  title,
  style,
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image 
        source={{ uri: image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default WeddingIdeaCard; 