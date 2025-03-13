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

const CartItem = ({ title, price, onIncrement, onDecrement, quantity }) => (
    <View style={styles.cartItem}>
        <View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemPrice}>₹{price}/person</Text>
        </View>
        <View style={styles.quantityControl}>
            <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const CartScreen = () => {
    const router = useRouter();
    const [items, setItems] = useState([
        { id: 1, title: 'Wedsta Silver Package', price: '4,000', quantity: 1 },
        { id: 2, title: 'Wedsta Silver Package', price: '4,000', quantity: 1 },
        { id: 3, title: 'Wedsta Silver Package', price: '4,000', quantity: 1 },
    ]);
    const [selectedPayment, setSelectedPayment] = useState('full');

    const handleBack = () => {
        router.back();
    };

    const handleQuantity = (id, increment) => {
        setItems(items.map(item => 
            item.id === id 
                ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
                : item
        ));
    };

    const handleViewCart = () => {
        router.push("/cart"); // Add your cart route
    };

    const handleAddDetails = () => {
        router.push("/cart/address-details");
    };

    const totalAmount = 36000;
    const discount = selectedPayment === 'full' ? 3600 : 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Order</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Cart Items */}
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrement={() => handleQuantity(item.id, true)}
                        onDecrement={() => handleQuantity(item.id, false)}
                    />
                ))}

                {/* Additional Details */}
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={handleAddDetails}
                >
                    <Text style={styles.detailsButtonText}>Add Details</Text>
                    <Ionicons name="chevron-forward" size={24} color="#333" />
                </TouchableOpacity>

                {/* Time Slot */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Slot</Text>
                    <TouchableOpacity style={styles.slotInput}>
                        <Text style={styles.placeholderText}>Select Slot</Text>
                        <Ionicons name="calendar-outline" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Requirements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Please mention other requirements</Text>
                    <TextInput
                        style={styles.requirementsInput}
                        placeholder="Please mention other requirements"
                        multiline
                    />
                </View>

                {/* Payment Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>
                    <View style={styles.paymentOptions}>
                        <TouchableOpacity 
                            style={[styles.paymentOption, selectedPayment === 'full' && styles.selectedPayment]}
                            onPress={() => setSelectedPayment('full')}
                        >
                            <View style={styles.radioButton}>
                                {selectedPayment === 'full' && <View style={styles.radioButtonInner} />}
                            </View>
                            <View>
                                <Text style={styles.paymentOptionText}>Pay full amount and get 5% off</Text>
                                <Text style={styles.discountText}>Save ₹3,600</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.paymentOption, selectedPayment === 'split' && styles.selectedPayment]}
                            onPress={() => setSelectedPayment('split')}
                        >
                            <View style={styles.radioButton}>
                                {selectedPayment === 'split' && <View style={styles.radioButtonInner} />}
                            </View>
                            <Text style={styles.paymentOptionText}>Pay 50% now and 50% later</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <TouchableOpacity style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
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
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    itemTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFE8EF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#FF4D8D',
        fontWeight: '600',
    },
    quantity: {
        fontSize: 16,
        color: '#333',
    },
    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    detailsButtonText: {
        fontSize: 16,
        color: '#333',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    },
    slotInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    placeholderText: {
        color: '#999',
    },
    requirementsInput: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        height: 100,
        textAlignVertical: 'top',
    },
    paymentOptions: {
        gap: 16,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    selectedPayment: {
        backgroundColor: '#FFE8EF',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF4D8D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF4D8D',
    },
    paymentOptionText: {
        fontSize: 14,
        color: '#333',
    },
    discountText: {
        fontSize: 12,
        color: '#FF4D8D',
        marginTop: 4,
    },
    proceedButton: {
        backgroundColor: '#FF4D8D',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    proceedButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CartScreen; 