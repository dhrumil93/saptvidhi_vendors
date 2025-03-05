import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CollectionCard = ({ title, subtitle, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
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
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default CollectionCard; 