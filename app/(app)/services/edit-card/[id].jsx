import React from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const { width: screenWidth } = Dimensions.get('window');

const EditCardPage = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bird of Charm</Text>
            </View>

            <Text style={styles.pageIndicator}>Page 1</Text>

            {/* Card Preview */}
            <View style={styles.cardPreview}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2787' }}
                    style={styles.cardImage}
                />
                <TouchableOpacity style={styles.nextButton}>
                    <Ionicons name="chevron-forward" size={24} color="#FF4D8D" />
                </TouchableOpacity>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity 
                    style={styles.customizeButton}
                    onPress={() => router.push(`/home/services/customize-card/${id}`)}
                >
                    <Text style={styles.customizeText}>Customize The Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 8,
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
    pageIndicator: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginVertical: 8,
    },
    cardPreview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#F5F5F5',
        margin: 16,
        borderRadius: 12,
    },
    cardImage: {
        width: screenWidth - 64,
        height: (screenWidth - 64) * 1.4,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    nextButton: {
        position: 'absolute',
        right: -16,
        top: '50%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    bottomActions: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        gap: 12,
    },
    customizeButton: {
        backgroundColor: '#FF4D8D',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    customizeText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    removeButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF4D8D',
    },
    removeText: {
        color: '#FF4D8D',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditCardPage; 