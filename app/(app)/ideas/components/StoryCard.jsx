import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const StoryCard = ({ story, onLikePress, onPress }) => (
    <TouchableOpacity style={styles.storyCard} onPress={onPress}>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
        <TouchableOpacity 
            style={styles.likeButton}
            onPress={() => onLikePress(story.id)}
        >
            <Ionicons 
                name={story.liked ? "heart" : "heart-outline"} 
                size={24} 
                color={story.liked ? "#FF4D8D" : "#FFF"} 
            />
        </TouchableOpacity>
        <View style={styles.storyInfo}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyMeta}>
                {story.date} | {story.readTime}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    storyCard: {
        marginBottom: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    storyImage: {
        width: '100%',
        height: 200,
    },
    likeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        padding: 4,
    },
    storyInfo: {
        padding: 12,
    },
    storyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    storyMeta: {
        fontSize: 12,
        color: '#666',
    },
});

export default StoryCard; 