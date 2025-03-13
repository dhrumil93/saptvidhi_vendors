import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";
import { storiesData } from '../data';

const StoryDetailsScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const story = storiesData.find(s => s.id === id);

    const handleBack = () => {
        router.back();
    };

    if (!story) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Story</Text>
            </View>

            <ScrollView style={styles.content}>
                <Image source={{ uri: story.image }} style={styles.coverImage} />
                
                <View style={styles.storyContent}>
                    <Text style={styles.title}>{story.title}</Text>
                    
                    <View style={styles.metaInfo}>
                        <Text style={styles.metaText}>{story.date}</Text>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.metaText}>{story.readTime}</Text>
                    </View>

                    <Text style={styles.contentText}>{story.content}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 16,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#333',
    },
    content: {
        flex: 1,
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    storyContent: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    metaText: {
        fontSize: 14,
        color: '#666',
    },
    metaDot: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 8,
    },
    contentText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
    },
});

export default StoryDetailsScreen; 