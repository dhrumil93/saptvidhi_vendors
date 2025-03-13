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
    Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";
import { realWeddingsData } from '../data';

const { width: screenWidth } = Dimensions.get('window');

const RealWeddingDetailsScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const wedding = realWeddingsData.find(w => w.id === id);

    const handleBack = () => {
        router.back();
    };

    if (!wedding) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            <ScrollView style={styles.scrollView}>
                <Image source={{ uri: wedding.image }} style={styles.coverImage} />
                
                <View style={styles.content}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>{wedding.title}</Text>
                        <Text style={styles.subtitle}>{wedding.subtitle}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoItem}>
                            <Ionicons name="location-outline" size={20} color="#666" />
                            <Text style={styles.infoText}>{wedding.location}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                            <Text style={styles.infoText}>{wedding.date}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Wedding Photos</Text>
                    <View style={styles.photoGrid}>
                        {wedding.photos.map((photo, index) => (
                            <Image 
                                key={index}
                                source={{ uri: photo }}
                                style={styles.gridPhoto}
                            />
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Vendors</Text>
                    {wedding.vendors.map((vendor, index) => (
                        <View key={index} style={styles.vendorCard}>
                            <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
                            <View style={styles.vendorInfo}>
                                <Text style={styles.vendorType}>{vendor.name}</Text>
                                <Text style={styles.vendorName}>{vendor.company}</Text>
                            </View>
                        </View>
                    ))}
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
    scrollView: {
        flex: 1,
    },
    coverImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#F5F5F5',
    },
    content: {
        padding: 16,
    },
    backButton: {
        position: 'absolute',
        top: -280,
        left: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        padding: 8,
    },
    header: {
        marginTop: 16,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginBottom: 32,
    },
    gridPhoto: {
        width: (screenWidth - 40) / 3,
        height: (screenWidth - 40) / 3,
        margin: 4,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    vendorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    vendorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
    },
    vendorInfo: {
        marginLeft: 12,
    },
    vendorType: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    vendorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default RealWeddingDetailsScreen; 