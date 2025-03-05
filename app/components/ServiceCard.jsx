import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const ServiceCard = ({ 
  title, 
  description, 
  image, 
  onPress,
  style 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default ServiceCard; 