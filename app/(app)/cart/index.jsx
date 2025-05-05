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
  Image,
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

  // Calculate total amount and discount whenever items or payment method changes
  useEffect(() => {
    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(calculatedTotal);

    // Calculate discount (10% for full payment)
    const discountAmount =
      selectedPayment === "full" ? calculatedTotal * 0.1 : 0;
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

  const [isProcessing, setIsProcessing] = useState(false);

  // Get button text based on selected gateway and payment option
  const getPayButtonText = () => {
    const amountText = `₹${formatPrice(
      selectedPayment === "split"
        ? (totalAmount - discount) / 2
        : totalAmount - discount
    )}`;
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
          <SlotSelector
            onPress={handleSelectSlot}
            selectedSlot={selectedSlot}
          />
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
            <Text style={styles.totalValue}>
              ₹{formatPrice(totalAmount - discount)}
            </Text>
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

        {/* Payment Method Selection */}
        {/* <Section title="Select Payment Method">
          <View style={styles.paymentMethodsContainer}>
            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                selectedGateway === "razorpay" && styles.selectedPaymentMethod,
              ]}
              onPress={() => handleGatewaySelection("razorpay")}
            >
              <View style={styles.paymentLogoContainer}>
                <Text style={styles.paymentLogo}>Razorpay</Text>
              </View>
              <Text style={styles.paymentMethodName}>Razorpay</Text>
              <View style={styles.paymentStatusContainer}>
                <Ionicons
                  name={razorpayAvailable ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={razorpayAvailable ? "#4CAF50" : "#FF9800"}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                selectedGateway === "phonepe" && styles.selectedPaymentMethod,
              ]}
              onPress={() => handleGatewaySelection("phonepe")}
            >
              <View style={styles.paymentLogoContainer}>
                <Text style={styles.paymentLogo}>PhonePe</Text>
              </View>
              <Text style={styles.paymentMethodName}>PhonePe</Text>
              <View style={styles.paymentStatusContainer}>
                <Ionicons
                  name={phonePeAvailable ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={phonePeAvailable ? "#4CAF50" : "#FF9800"}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                selectedGateway === "stripe" && styles.selectedPaymentMethod,
              ]}
              onPress={() => handleGatewaySelection("stripe")}
            >
              <View style={styles.paymentLogoContainer}>
                <Text style={styles.paymentLogo}>Stripe</Text>
              </View>
              <Text style={styles.paymentMethodName}>Stripe</Text>
              <View style={styles.paymentStatusContainer}>
                <Ionicons
                  name={stripeAvailable ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={stripeAvailable ? "#4CAF50" : "#FF9800"}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                selectedGateway === "paypal" && styles.selectedPaymentMethod,
              ]}
              onPress={() => handleGatewaySelection("paypal")}
            >
              <View style={styles.paymentLogoContainer}>
                <Text style={styles.paymentLogo}>PayPal</Text>
              </View>
              <Text style={styles.paymentMethodName}>PayPal</Text>
              <View style={styles.paymentStatusContainer}>
                <Ionicons
                  name={paypalAvailable ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={paypalAvailable ? "#4CAF50" : "#FF9800"}
                />
              </View>
            </TouchableOpacity>
          </View>

          {paymentMode === "simulation" && (
            <Text style={styles.paymentDisclaimerText}>
              Note: All payments will be simulated for development purposes
            </Text>
          )}
        </Section> */}
      </ScrollView>

      <PrimaryButton
        title={isProcessing ? "Processing..." : "Pay Now"}
        // onPress={handleProceedToPay}
        // style={getPayButtonStyle()}
        disabled={isProcessing}
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
  paymentMethodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  paymentMethodOption: {
    width: "48%",
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },
  selectedPaymentMethod: {
    borderColor: "#FF69B4",
    borderWidth: 2,
    backgroundColor: "#FFF0F7",
  },
  paymentLogoContainer: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  paymentLogo: {
    fontWeight: "bold",
    fontSize: 14,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  paymentStatusContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  paymentDisclaimerText: {
    fontSize: 12,
    color: "#FF9800",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
  defaultPayButton: {
    backgroundColor: "#FF69B4",
  },
  razorpayButton: {
    backgroundColor: "#2B83EA",
  },
  stripeButton: {
    backgroundColor: "#6772E5",
  },
  paypalButton: {
    backgroundColor: "#0079C1",
  },
  phonePeButton: {
    backgroundColor: "#5F259F",
  },
  simulateButton: {
    backgroundColor: "#FF9800",
  },
});

export default CartScreen;
