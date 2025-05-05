import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { invitesData } from "./data";
import InviteSection from "./components/InviteSection";
import BackgroundShapes from "../../components/BackgroundShapes";
import Header from "../../components/Header";

const ServicesPage = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            <View style={styles.headerContainer}>

                <Header
                    location="E-Invites"
                    onLocationPress={() => { }}
                    onMenuPress={() => { }}
                    onSearch={() => { }}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                <InviteSection
                    title="Wedding Cards"
                    data={invitesData.weddingCards}
                    onViewAll={() => router.push('/services/your-cards')}
                    onItemPress={(item) => router.push(`/services/your-cards`)}
                />

                <InviteSection
                    title="Video Invites"
                    data={invitesData.videoInvites}
                    // onViewAll={() => router.push('/services/video-invites')}
                    // onItemPress={(item) => router.push(`/services/video-invites/${item.id}`)}
                    showDuration
                />

                <InviteSection
                    title="Save The Date Cards"
                    data={invitesData.saveTheDate}
                    // onViewAll={() => router.push('/services/save-the-date')}
                    // onItemPress={(item) => router.push(`/services/save-the-date/${item.id}`)}
                />
            </ScrollView>

            {/* Your Cards Button */}
            <TouchableOpacity 
                style={styles.yourCardsButton}
                onPress={() => router.push('/home/services/your-cards')}
            >
                <Ionicons name="card-outline" size={20} color="#FFF" />
                <Text style={styles.yourCardsText}>Your Cards</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    headerContainer: {
        paddingTop: StatusBar.currentHeight || 0,
    },
    backButton: {
        position: 'absolute',
        top: StatusBar.currentHeight + 16,
        left: 16,
        zIndex: 1,
        padding: 4,
    },
    scrollView: {
        flex: 1,
        marginTop: 16,
    },
    yourCardsButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF4D8D',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    yourCardsText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default ServicesPage;

