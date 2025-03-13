import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../components/BackgroundShapes";

const AddressDetailsScreen = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        pincode: '',
        city: '',
        buildingName: '',
        roadName: '',
        name: '',
        email: '',
        phone: '',
        secondaryPhone: ''
    });

    const handleBack = () => {
        router.back();
    };

    const handleConfirm = () => {
        // Handle form submission
        console.log(formData);
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
                <Text style={styles.headerTitle}>Address Details</Text>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Address Details</Text>

                {/* Form Fields */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Brand Name"
                        value={formData.pincode}
                        onChangeText={(text) => setFormData({...formData, pincode: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>City</Text>
                    <TouchableOpacity style={styles.input}>
                        <Text style={styles.placeholderText}>Select City</Text>
                        <Ionicons name="chevron-down" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>House No. Building Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter House No. Building Name"
                        value={formData.buildingName}
                        onChangeText={(text) => setFormData({...formData, buildingName: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Enter Road Name, Area, Colony</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Road Name, Area, Colony"
                        value={formData.roadName}
                        onChangeText={(text) => setFormData({...formData, roadName: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({...formData, name: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone No.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone No."
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({...formData, phone: text})}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Secondary Phone No.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Secondary Phone No."
                        keyboardType="phone-pad"
                        value={formData.secondaryPhone}
                        onChangeText={(text) => setFormData({...formData, secondaryPhone: text})}
                    />
                </View>
            </ScrollView>

            {/* Confirm Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
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
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 8,
        padding: 16,
        fontSize: 14,
        color: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        fontSize: 14,
    },
    confirmButton: {
        backgroundColor: '#FF4D8D',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddressDetailsScreen; 