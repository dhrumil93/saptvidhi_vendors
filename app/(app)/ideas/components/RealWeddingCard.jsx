import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const RealWeddingCard = ({ wedding, onPress, onLikePress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: wedding.image }} style={styles.image} />
        <TouchableOpacity 
            style={styles.likeButton}
            onPress={() => onLikePress(wedding.id)}
        >
            <Ionicons 
                name={wedding.liked ? "heart" : "heart-outline"} 
                size={24} 
                color={wedding.liked ? "#FF4D8D" : "#FFF"} 
            />
        </TouchableOpacity>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{wedding.title}</Text>
            <Text style={styles.subtitle}>{wedding.subtitle}</Text>
            <Text style={styles.meta}>{wedding.date} | {wedding.readTime}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#F5F5F5',
    },
    likeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        padding: 4,
        zIndex: 1,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 4,
    },
    meta: {
        fontSize: 12,
        color: '#FFF',
    },
});

export default RealWeddingCard; 