import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const VendorCard = ({ vendor, onPress }) => (
    <TouchableOpacity style={styles.vendorCard} onPress={onPress}>
        <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
        <View style={styles.vendorInfo}>
            <Text style={styles.vendorType}>{vendor.type}</Text>
            <Text style={styles.vendorName}>{vendor.name}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    vendorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    vendorImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    vendorInfo: {
        flex: 1,
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

export default VendorCard; 