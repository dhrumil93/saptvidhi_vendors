import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../components/BackgroundShapes";

// Import components
import CartItem from "../../components/cart/CartItem.jsx";
import Header from "../../components/cart/Header";
import Section from "../../components/cart/Section";
import SlotSelector from "../../components/cart/SlotSelector";
import PaymentOption from "../../components/cart/PaymentOption";
import PrimaryButton from "../../components/cart/PrimaryButton";

// Import Razorpay with better error handling
let RazorpayCheckout = null;
if (Platform.OS !== 'web') {
  // Only import on native platforms
  try {
    const RazorpayModule = require('react-native-razorpay');
    RazorpayCheckout = RazorpayModule.default || RazorpayModule;
    console.log("Razorpay loaded successfully:", typeof RazorpayCheckout);
  } catch (e) {
    console.error("Failed to load Razorpay:", e);
  }
}

const CartScreen = () => {
  const router = useRouter();
  const [items, setItems] = useState([
    { id: 1, title: "Wedsta Silver Package", price: 4000, quantity: 1 },
    { id: 2, title: "Wedsta Silver Package", price: 4000, quantity: 1 },
    { id: 3, title: "Wedsta Silver Package", price: 4000, quantity: 1 },
  ]);
  const [selectedPayment, setSelectedPayment] = useState("full");
  const [requirements, setRequirements] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isRazorpayAvailable, setIsRazorpayAvailable] = useState(false);
  const [paymentMode, setPaymentMode] = useState("unknown"); // "razorpay", "simulation", or "unknown"

  // Check if Razorpay is available on component mount
  useEffect(() => {
    const checkRazorpay = () => {
      const available = RazorpayCheckout !== null && 
                       typeof RazorpayCheckout === 'object' && 
                       typeof RazorpayCheckout.open === 'function';
      
      setIsRazorpayAvailable(available);
      console.log("Razorpay availability:", available);
      
      // Set payment mode based on availability
      setPaymentMode(available ? "razorpay" : "simulation");
    };
    
    checkRazorpay();
  }, []);

  // Calculate total amount and discount whenever items or payment method changes
  useEffect(() => {
    const calculatedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(calculatedTotal);
    
    // Calculate discount (10% for full payment)
    const discountAmount = selectedPayment === "full" ? calculatedTotal * 0.1 : 0;
    setDiscount(discountAmount);
  }, [items, selectedPayment]);

  const handleBack = () => {
    router.back();
  };

  const handleQuantity = (id, increment) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + (increment ? 1 : -1)),
            }
          : item
      )
    );
  };

  const handleAddDetails = () => {
    router.push("/cart/address-details");
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleProceedToPay = async () => {
    // Double-check Razorpay availability
    if (!isRazorpayAvailable) {
      console.log("Razorpay not available, falling back to development payment");
      handleDevelopmentPayment();
      return;
    }

    try {
      setPaymentMode("razorpay");
      const paymentAmount = selectedPayment === "split" 
        ? Math.round((totalAmount - discount) / 2 * 100) 
        : Math.round((totalAmount - discount) * 100);

      const options = {
        key: "rzp_test_vv1FCZvuDRF6lQ",
        amount: paymentAmount, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Saptvidhi Vendors',
        description: 'Wedding Services Payment',
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
          name: 'User Name'
        },
        theme: { color: '#FF69B4' }
      };

      console.log("Payment options:", options);

      // Safely call Razorpay
      try {
        const data = await RazorpayCheckout.open(options);
        console.log("Payment success via Razorpay:", data);
        Alert.alert(
          "Razorpay Payment Successful", 
          `Payment processed through Razorpay.\nPayment ID: ${data.razorpay_payment_id}`,
          [
            { 
              text: "OK", 
              onPress: () => router.push({
                pathname: '/cart/payment-success',
                params: { paymentMode: 'razorpay', paymentId: data.razorpay_payment_id }
              })
            }
          ]
        );
      } catch (error) {
        console.log("Payment error:", error);
        // Fix for undefined error messages
        const errorMessage = error && (error.message || error.description) 
          ? `${error.message || error.description}`
          : "Payment failed. Please try again.";
        
        Alert.alert("Razorpay Payment Failed", errorMessage);
      }
    } catch (error) {
      console.log("Setup error:", error);
      // Handle any unexpected errors with the Razorpay setup
      const errorMessage = error && error.message 
        ? error.message 
        : "Something went wrong with the payment setup";
      
      Alert.alert("Error", errorMessage);
      handleDevelopmentPayment();
    }
  };

  // Fallback for development or when Razorpay is not available
  const handleDevelopmentPayment = () => {
    setPaymentMode("simulation");
    Alert.alert(
      "SIMULATION MODE",
      "⚠️ Razorpay is not available. This is a payment simulation for development purposes only.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Simulate Payment", 
          onPress: () => {
            Alert.alert(
              "Simulated Payment Successful",
              "⚠️ This was a SIMULATED payment. No actual transaction occurred.",
              [
                { 
                  text: "OK", 
                  onPress: () => router.push({
                    pathname: '/cart/payment-success',
                    params: { paymentMode: 'simulation', paymentId: 'sim-' + Date.now() }
                  })
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <BackgroundShapes />

      <Header title="Confirm Order" onBack={handleBack} />

      {/* Payment Mode Indicator */}
      {paymentMode === "simulation" && (
        <View style={styles.paymentModeIndicator}>
          <Text style={styles.paymentModeText}>
            ⚠️ SIMULATION MODE - Razorpay Not Available
          </Text>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Cart Items */}
        {items.map((item) => (
          <CartItem
            key={item.id}
            title={item.title}
            price={formatPrice(item.price)}
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
        <Section title="Select Slot">
          <SlotSelector onPress={handleSelectSlot} selectedSlot={selectedSlot} />
        </Section>

        {/* Requirements */}
        <Section title="Please mention other requirements">
          <TextInput
            style={styles.requirementsInput}
            placeholder="Please mention other requirements"
            multiline
            value={requirements}
            onChangeText={setRequirements}
          />
        </Section>

        {/* Payment Summary */}
        <Section title="Payment Summary">
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{formatPrice(totalAmount)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryValue}>-₹{formatPrice(discount)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{formatPrice(totalAmount - discount)}</Text>
          </View>

          <PaymentOption
            title="Pay full amount and get 10% off"
            discount={formatPrice(totalAmount * 0.1)}
            isSelected={selectedPayment === "full"}
            onSelect={() => setSelectedPayment("full")}
          />
          <PaymentOption
            title="Pay 50% now and 50% later"
            isSelected={selectedPayment === "split"}
            onSelect={() => setSelectedPayment("split")}
          />
        </Section>
        
        {/* Payment Method Indicator */}
        <Section title="Payment Method">
          <View style={styles.paymentMethodRow}>
            <Text style={styles.paymentMethodLabel}>
              {isRazorpayAvailable 
                ? "Razorpay Payments (Live)" 
                : "Simulation Mode (Development Only)"}
            </Text>
            <Ionicons 
              name={isRazorpayAvailable ? "checkmark-circle" : "alert-circle"} 
              size={24} 
              color={isRazorpayAvailable ? "#4CAF50" : "#FF9800"} 
            />
          </View>
        </Section>
      </ScrollView>

      <PrimaryButton 
        title={`${isRazorpayAvailable ? "Pay" : "SIMULATE"} (₹${formatPrice(
          selectedPayment === "split" 
            ? (totalAmount - discount) / 2 
            : (totalAmount - discount)
        )})`} 
        onPress={isRazorpayAvailable ? handleProceedToPay : handleDevelopmentPayment}
        style={isRazorpayAvailable ? styles.payButton : styles.simulateButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  detailsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailsButtonText: {
    fontSize: 16,
    color: "#333",
  },
  requirementsInput: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paymentModeIndicator: {
    backgroundColor: "#FFF3CD",
    padding: 10,
    alignItems: "center",
  },
  paymentModeText: {
    color: "#856404",
    fontWeight: "bold",
  },
  paymentMethodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  payButton: {
    backgroundColor: "#FF69B4",
  },
  simulateButton: {
    backgroundColor: "#FF9800",
  },
});

export default CartScreen;