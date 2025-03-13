import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const PhotoGrid = ({ photos }) => (
    <View style={styles.photoGrid}>
        {photos.map((photo, index) => (
            <TouchableOpacity key={index} style={styles.photoItem}>
                <Image source={{ uri: photo }} style={styles.gridPhoto} />
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    photoItem: {
        width: (screenWidth - 40) / 2,
        height: (screenWidth - 40) / 2,
    },
    gridPhoto: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});

export default PhotoGrid; 