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
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information (name, email, phone number)",
      "Business Information (business name, address, GST details)",
      "Venue Information (photos, descriptions, pricing)",
      "Device Information (device type, IP address)",
      "Usage Information (app interactions, bookings)",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our services",
      "To process your venue bookings and payments",
      "To communicate with you about bookings and updates",
      "To improve our services and user experience",
      "To comply with legal obligations",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures",
      "Your data is encrypted during transmission",
      "Regular security audits and updates",
      "Limited access to personal information",
    ],
  },
];

export default function PrivacyScreen() {
  const router = useRouter();

  const renderSection = (section, index) => (
    <View key={index} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.content.map((item, i) => (
        <View key={i} style={styles.bulletPoint}>
          <View style={styles.bullet} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );

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
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: March 28, 2024</Text>

        <Text style={styles.introduction}>
          Welcome to Saptvidhi Vendors. We are committed to protecting your
          privacy and ensuring the security of your personal information.
        </Text>

        {PRIVACY_SECTIONS.map(renderSection)}

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>
            Contact Us for Privacy Concerns
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
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
    padding: 16,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  introduction: {
    fontSize: 14,
    color: "#1a1a1a",
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF69B4",
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF69B4",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
