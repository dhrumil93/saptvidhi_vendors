import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free Plan",
    price: "0",
    duration: "month",
    features: [
      "Basic venue listing",
      "3 venue photos",
      "Email support",
      "Basic analytics"
    ],
    current: true
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "999",
    duration: "month",
    features: [
      "Premium venue listing",
      "20 venue photos",
      "Priority support",
      "Advanced analytics",
      "Featured in search",
      "Customer insights"
    ],
    recommended: true
  },
  {
    id: "business",
    name: "Business Plan",
    price: "2499",
    duration: "month",
    features: [
      "All Pro features",
      "Unlimited photos",
      "24/7 support",
      "Custom analytics",
      "Top search placement",
      "Booking management",
      "Team accounts"
    ]
  }
];

export default function SubscriptionScreen() {
  const router = useRouter();

  const renderPlan = (plan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        plan.current && styles.currentPlan,
        plan.recommended && styles.recommendedPlan
      ]}
    >
      {plan.recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Recommended</Text>
        </View>
      )}
      
      <Text style={styles.planName}>{plan.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.currency}>₹</Text>
        <Text style={styles.price}>{plan.price}</Text>
        <Text style={styles.duration}>/{plan.duration}</Text>
      </View>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.actionButton,
          plan.current ? styles.currentButton : styles.upgradeButton
        ]}
      >
        <Text style={styles.actionButtonText}>
          {plan.current ? "Current Plan" : "Upgrade"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackgroundShapes />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription Plans</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Choose the perfect plan for your business
        </Text>
        
        {SUBSCRIPTION_PLANS.map(renderPlan)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentPlan: {
    borderColor: "#FF69B4",
    borderWidth: 2,
  },
  recommendedPlan: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  recommendedBadge: {
    position: "absolute",
    top: -12,
    right: 24,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  planName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  currency: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginHorizontal: 4,
  },
  duration: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#666",
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  upgradeButton: {
    backgroundColor: "#FF69B4",
  },
  currentButton: {
    backgroundColor: "#f0f0f0",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  }
});