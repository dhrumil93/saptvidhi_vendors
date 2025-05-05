import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';

const InviteCard = ({ item, onPress, showDuration }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {showDuration && item.duration && (
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      )}
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 4,
    marginTop: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
    color: '#333',
    paddingHorizontal: 8,
  },
  durationContainer: {
    position: 'absolute',
    bottom: 40,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  duration: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default InviteCard; 