import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const SUPPORT_OPTIONS = [
  {
    id: "faq",
    title: "FAQs",
    description: "Find answers to common questions",
    icon: "help-circle",
    type: "ionicon",
  },
  {
    id: "chat",
    title: "Live Chat",
    description: "Chat with our support team",
    icon: "chatbubble-ellipses",
    type: "ionicon",
    badge: "Online",
  },
  {
    id: "email",
    title: "Email Support",
    description: "support@saptvidhi.com",
    icon: "mail",
    type: "ionicon",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "+91 98765 43210",
    icon: "whatsapp",
    type: "material",
  },
  {
    id: "phone",
    title: "Call Us",
    description: "Available 9 AM - 6 PM",
    icon: "call",
    type: "ionicon",
    subtitle: "+91 98765 43210",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I list my venue?",
    answer:
      "Go to My Venues section and tap on Add New Venue button. Fill in the required details and submit for review.",
  },
  {
    question: "When will I receive my payment?",
    answer:
      "Payments are processed within 24-48 hours after the event completion and transferred to your registered bank account.",
  },
  // Add more FAQs as needed
];
export default function SupportScreen() {
  const router = useRouter();

  const handleSupportOption = (id) => {
    switch (id) {
      case "faq":
        router.push("/(app)/more/support/faq");
        break;
      case "chat":
        router.push("/(app)/more/support/chat");
        break;
      case "email":
        Linking.openURL("mailto:support@saptvidhi.com");
        break;
      case "whatsapp":
        Linking.openURL("whatsapp://send?phone=919876543210");
        break;
      case "phone":
        Linking.openURL("tel:+919876543210");
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <BackgroundShapes />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How can we help you?</Text>

          {SUPPORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.supportCard}
              onPress={() => handleSupportOption(option.id)}
            >
              <View style={styles.supportInfo}>
                {option.type === "ionicon" ? (
                  <Ionicons name={option.icon} size={24} color="#FF69B4" />
                ) : (
                  <MaterialIcons name={option.icon} size={24} color="#FF69B4" />
                )}
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>{option.title}</Text>
                  <Text style={styles.supportDescription}>
                    {option.description}
                  </Text>
                  {option.subtitle && (
                    <Text style={styles.supportSubtitle}>
                      {option.subtitle}
                    </Text>
                  )}
                </View>
              </View>
              {option.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{option.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular FAQs</Text>
          {FAQ_ITEMS.slice(0, 3).map((faq, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push("/(app)/more/support/faq")}
          >
            <Text style={styles.viewAllText}>View All FAQs</Text>
            <Ionicons name="arrow-forward" size={16} color="#FF69B4" />
          </TouchableOpacity>
        </View>
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
    padding: 16,
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
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  supportInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: "#666",
  },
  supportSubtitle: {
    fontSize: 14,
    color: "#FF69B4",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#FF69B4",
    fontWeight: "500",
  },
});
