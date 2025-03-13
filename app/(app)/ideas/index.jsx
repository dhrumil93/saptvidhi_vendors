import React, { useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../components/BackgroundShapes";
import TabBar from "./components/TabBar";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";
import StoryCard from "./components/StoryCard";
import { photosData, storiesData, realWeddingsData } from "./data";
import RealWeddingCard from './components/RealWeddingCard';

const IdeasScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('stories');
    const [photos, setPhotos] = useState(photosData);
    const [stories, setStories] = useState(storiesData);

    const handleBack = () => {
        router.back();
    };

    const handleLikePress = (id) => {
        if (activeTab === 'photos') {
            setPhotos(photos.map(photo => 
                photo.id === id ? { ...photo, liked: !photo.liked } : photo
            ));
        } else {
            setStories(stories.map(story => 
                story.id === id ? { ...story, liked: !story.liked } : story
            ));
        }
    };

    const handleStoryPress = (story) => {
        router.push(`/ideas/story/${story.id}`);
    };

    const handleRealWeddingPress = (wedding) => {
        router.push(`/ideas/real-wedding/${wedding.id}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ideas</Text>
            </View>

            <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
            <SearchBar onSearch={() => {}} />

            <ScrollView style={styles.content}>
                {activeTab === 'photos' && (
                    <PhotoGrid 
                        photos={photos}
                        onLikePress={handleLikePress}
                    />
                )}
                {activeTab === 'stories' && (
                    <View style={styles.storiesContainer}>
                        {stories.map(story => (
                            <StoryCard
                                key={story.id}
                                story={story}
                                onLikePress={handleLikePress}
                                onPress={() => handleStoryPress(story)}
                            />
                        ))}
                    </View>
                )}
                {activeTab === 'realWedding' && (
                    <View style={styles.realWeddingsContainer}>
                        {realWeddingsData.map(wedding => (
                            <RealWeddingCard
                                key={wedding.id}
                                wedding={wedding}
                                onLikePress={handleLikePress}
                                onPress={() => handleRealWeddingPress(wedding)}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
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
    storiesContainer: {
        padding: 16,
    },
    realWeddingsContainer: {
        padding: 16,
    },
});

export default IdeasScreen; 