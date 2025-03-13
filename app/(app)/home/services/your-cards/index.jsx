import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../../components/BackgroundShapes";
import InviteCard from "../components/InviteCard";

const yourCardsData = [
    {
        id: '1',
        name: 'Loving Paradise',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2787',
        status: 'editing',
    },
    {
        id: '2',
        name: 'Bird of Charm',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2787',
        status: 'editing',
    },
    {
        id: '3',
        name: 'Sweet William',
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=2787',
        status: 'editing',
    },
];

const YourCardsPage = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const EditButton = () => (
        <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={16} color="#FFF" />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Cards</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Continue Editing Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Continue editing card</Text>
                    <View style={styles.cardsContainer}>
                        {yourCardsData.map((card) => (
                            <View key={card.id} style={styles.cardWrapper}>
                                <InviteCard
                                    item={card}
                                    onPress={() => router.push(`/home/services/edit-card/${card.id}`)}
                                />
                                <EditButton />
                            </View>
                        ))}
                    </View>
                </View>
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
    scrollView: {
        flex: 1,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    cardWrapper: {
        position: 'relative',
    },
    editIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF4D8D',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

export default YourCardsPage; 