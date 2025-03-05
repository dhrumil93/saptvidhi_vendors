import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RealWeddingCard = ({ 
  image, 
  coupleName,
  location,
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.coupleName}>{coupleName}</Text>
        <Text style={styles.location}>at {location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coupleName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
});

export default RealWeddingCard; 