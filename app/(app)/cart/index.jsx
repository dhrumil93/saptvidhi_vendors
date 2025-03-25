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

// Add these imports at the top
import { PAYMENT_CONFIG } from "../../../config/payment";
import { initStripe } from "@stripe/stripe-react-native";
import PayPal from "react-native-paypal-wrapper";
// import PhonePe from 'phonepe-payment-sdk';

// Import payment gateways with better error handling
let RazorpayCheckout = null;
let StripeModule = null;
let PayPalModule = null;
let PhonePeModule = null;

if (Platform.OS !== "web") {
  // Only import on native platforms
  try {
    const RazorpayModule = require("react-native-razorpay");
    RazorpayCheckout = RazorpayModule.default || RazorpayModule;
    console.log("Razorpay loaded successfully:", typeof RazorpayCheckout);
  } catch (e) {
    console.error("Failed to load Razorpay:", e);
  }

  try {
    StripeModule = require("@stripe/stripe-react-native");
    console.log("Stripe loaded successfully");
  } catch (e) {
    console.error("Failed to load Stripe:", e);
  }

  try {
    PayPalModule = require("react-native-paypal");
    console.log("PayPal loaded successfully");
  } catch (e) {
    console.error("Failed to load PayPal:", e);
  }

  try {
    PhonePeModule = require("react-native-phonepe-pg");
    console.log("PhonePe loaded successfully");
  } catch (e) {
    console.error("Failed to load PhonePe:", e);
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

  // Payment gateway availability states
  const [razorpayAvailable, setRazorpayAvailable] = useState(false);
  const [stripeAvailable, setStripeAvailable] = useState(false);
  const [paypalAvailable, setPaypalAvailable] = useState(false);
  const [phonePeAvailable, setPhonePeAvailable] = useState(false);

  // Selected payment gateway
  const [selectedGateway, setSelectedGateway] = useState(null);

  // Payment mode (actual or simulation)
  const [paymentMode, setPaymentMode] = useState("unknown"); // "actual", "simulation", or "unknown"

  // Check payment gateways availability on component mount
  useEffect(() => {
    const checkPaymentGateways = () => {
      // Check Razorpay
      const isRazorpayAvailable =
        RazorpayCheckout !== null &&
        typeof RazorpayCheckout === "object" &&
        typeof RazorpayCheckout.open === "function";
      setRazorpayAvailable(isRazorpayAvailable);

      // Check Stripe
      const isStripeAvailable = StripeModule !== null;
      setStripeAvailable(isStripeAvailable);

      // Check PayPal
      const isPaypalAvailable = PayPalModule !== null;
      setPaypalAvailable(isPaypalAvailable);

      // Check PhonePe
      const isPhonePeAvailable = PhonePeModule !== null;
      setPhonePeAvailable(isPhonePeAvailable);

      console.log("Payment gateways availability:", {
        razorpay: isRazorpayAvailable,
        stripe: isStripeAvailable,
        paypal: isPaypalAvailable,
        phonePe: isPhonePeAvailable,
      });

      // Set default payment gateway (prefer Razorpay if available)
      if (isRazorpayAvailable) {
        setSelectedGateway("razorpay");
      } else if (isPhonePeAvailable) {
        setSelectedGateway("phonepe");
      } else if (isStripeAvailable) {
        setSelectedGateway("stripe");
      } else if (isPaypalAvailable) {
        setSelectedGateway("paypal");
      }

      // Set payment mode based on any gateway availability
      const anyGatewayAvailable =
        isRazorpayAvailable ||
        isStripeAvailable ||
        isPaypalAvailable ||
        isPhonePeAvailable;
      setPaymentMode(anyGatewayAvailable ? "actual" : "simulation");
    };

    checkPaymentGateways();
  }, []);

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

  const handleGatewaySelection = (gateway) => {
    setSelectedGateway(gateway);
  };

  const validatePaymentDetails = () => {
    // if (!selectedSlot) {
    //   Alert.alert("Error", "Please select a time slot");
    //   return false;
    // }

    if (!selectedGateway) {
      Alert.alert("Error", "Please select a payment method");
      return false;
    }

    return true;
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToPay = async () => {
    if (!validatePaymentDetails() || isProcessing) return;

    const finalAmount = selectedPayment === "split" 
      ? (totalAmount - discount) / 2 
      : (totalAmount - discount);
    
    setIsProcessing(true);
    
    try {
      let result;
      switch (selectedGateway) {
        case "razorpay":
          result = await processRazorpayPayment(finalAmount);
          break;
        case "stripe":
          result = await processStripePayment(finalAmount);
          break;
        case "paypal":
          result = await processPayPalPayment(finalAmount);
          break;
        case "phonepe":
          result = await processPhonePePayment(finalAmount);
          break;
        default:
          throw new Error("Invalid payment method");
      }
      
      handlePaymentSuccess(selectedGateway, result.paymentId);
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert(
        "Payment Failed",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const processRazorpayPayment = async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          resolve({
            paymentId: `rzp_test_${Date.now()}`,
            amount: amount,
          });
        } else {
          reject(new Error("Payment simulation failed"));
        }
      }, PAYMENT_CONFIG.SIMULATION_DELAY);
    });
  };

  const processStripePayment = async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          resolve({
            paymentId: `stripe_test_${Date.now()}`,
            amount: amount,
          });
        } else {
          reject(new Error("Payment simulation failed"));
        }
      }, PAYMENT_CONFIG.SIMULATION_DELAY);
    });
  };

  const processPayPalPayment = async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          resolve({
            paymentId: `pp_test_${Date.now()}`,
            amount: amount,
          });
        } else {
          reject(new Error("Payment simulation failed"));
        }
      }, PAYMENT_CONFIG.SIMULATION_DELAY);
    });
  };

  const processPhonePePayment = async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          resolve({
            paymentId: `phonepe_test_${Date.now()}`,
            amount: amount,
          });
        } else {
          reject(new Error("Payment simulation failed"));
        }
      }, PAYMENT_CONFIG.SIMULATION_DELAY);
    });
  };

  // Fallback simulation for payment
  const handleSimulatedPayment = (gateway = selectedGateway || "general") => {
    setPaymentMode("simulation");

    const gatewayName =
      gateway === "razorpay"
        ? "Razorpay"
        : gateway === "stripe"
        ? "Stripe"
        : gateway === "paypal"
        ? "PayPal"
        : gateway === "phonepe"
        ? "PhonePe"
        : "Payment";

    Alert.alert(
      `SIMULATION MODE - ${gatewayName}`,
      `⚠️ ${gatewayName} integration is not available. This is a payment simulation for development purposes only.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Simulate Payment",
          onPress: () => {
            Alert.alert(
              "Simulated Payment Successful",
              `⚠️ This was a SIMULATED ${gatewayName} payment. No actual transaction occurred.`,
              [
                {
                  text: "OK",
                  onPress: () =>
                    router.push({
                      pathname: "/cart/payment-success",
                      params: {
                        paymentMode: "simulation",
                        paymentGateway: gateway,
                        paymentId: `sim-${gateway}-${Date.now()}`,
                      },
                    }),
                },
              ]
            );
          },
        },
      ]
    );
  };

  // Add a new function to handle successful payments
  const handlePaymentSuccess = (gateway, paymentId) => {
    Alert.alert(
      "Payment Successful",
      `Payment completed via ${gateway.toUpperCase()}.\nPayment ID: ${paymentId}`,
      [
        {
          text: "OK",
          onPress: () =>
            router.push({
              pathname: "/cart/payment-success",
              params: {
                paymentMode: gateway,
                paymentId: paymentId,
              },
            }),
        },
      ]
    );
  };

  // Get button text based on selected gateway and payment option
  const getPayButtonText = () => {
    const amountText = `₹${formatPrice(
      selectedPayment === "split"
        ? (totalAmount - discount) / 2
        : totalAmount - discount
    )}`;

    const prefixText = paymentMode === "simulation" ? "SIMULATE" : "Pay with";
    const gatewayText =
      selectedGateway === "razorpay"
        ? "Razorpay"
        : selectedGateway === "stripe"
        ? "Stripe"
        : selectedGateway === "paypal"
        ? "PayPal"
        : selectedGateway === "phonepe"
        ? "PhonePe"
        : "Selected Method";

    return `${prefixText} ${gatewayText} (${amountText})`;
  };

  // Get button style based on selected gateway
  const getPayButtonStyle = () => {
    if (paymentMode === "simulation") return styles.simulateButton;

    switch (selectedGateway) {
      case "razorpay":
        return styles.razorpayButton;
      case "stripe":
        return styles.stripeButton;
      case "paypal":
        return styles.paypalButton;
      case "phonepe":
        return styles.phonePeButton;
      default:
        return styles.defaultPayButton;
    }
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
            ⚠️ SIMULATION MODE - Payment Gateways Not Available
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
        <Section title="Select Payment Method">
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
        </Section>
      </ScrollView>

      <PrimaryButton 
  title={isProcessing ? "Processing..." : getPayButtonText()} 
  onPress={handleProceedToPay}
  style={getPayButtonStyle()}
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
