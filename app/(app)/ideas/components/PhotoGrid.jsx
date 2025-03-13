import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get('window');

const PhotoGrid = ({ photos, onLikePress }) => (
    <View style={styles.photoGrid}>
        {photos.map((photo) => (
            <View key={photo.id} style={styles.photoItem}>
                <Image source={{ uri: photo.image }} style={styles.photo} />
                <TouchableOpacity 
                    style={styles.likeButton}
                    onPress={() => onLikePress(photo.id)}
                >
                    <Ionicons 
                        name={photo.liked ? "heart" : "heart-outline"} 
                        size={24} 
                        color={photo.liked ? "#FF4D8D" : "#FFF"} 
                    />
                </TouchableOpacity>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    photoItem: {
        width: (screenWidth - 32) / 2,
        height: (screenWidth - 32) / 2,
        padding: 4,
        position: 'relative',
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    likeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        padding: 4,
    },
});

export default PhotoGrid; 