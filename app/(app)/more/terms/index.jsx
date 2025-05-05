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

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using the Saptvidhi Vendors app, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access or use our services.`,
  },
  {
    title: "2. Vendor Responsibilities",
    subsections: [
      {
        title: "2.1 Account Management",
        points: [
          "Maintain accurate business information",
          "Keep login credentials secure",
          "Report unauthorized access immediately",
        ],
      },
      {
        title: "2.2 Venue Listings",
        points: [
          "Provide accurate venue details and pricing",
          "Update availability calendar regularly",
          "Upload authentic venue photographs",
        ],
      },
      {
        title: "2.3 Bookings",
        points: [
          "Honor confirmed bookings",
          "Respond to inquiries within 24 hours",
          "Maintain service quality standards",
        ],
      },
    ],
  },
  {
    title: "3. Payment Terms",
    content: [
      "Platform fee of 5% per booking",
      "Payment processing within 48 hours",
      "Cancellation policy compliance",
      "Refund processing guidelines",
    ],
  },
];

export default function TermsScreen() {
  const router = useRouter();

  const renderSubsection = (subsection) => (
    <View key={subsection.title} style={styles.subsection}>
      <Text style={styles.subsectionTitle}>{subsection.title}</Text>
      {subsection.points.map((point, index) => (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
    </View>
  );

  const renderSection = (section, index) => (
    <View key={index} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.content &&
        (typeof section.content === "string" ? (
          <Text style={styles.sectionContent}>{section.content}</Text>
        ) : (
          section.content.map((item, i) => (
            <View key={i} style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))
        ))}
      {section.subsections?.map(renderSubsection)}
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
        <Text style={styles.title}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Effective Date: March 28, 2024</Text>

        {TERMS_SECTIONS.map(renderSection)}

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Legal Team</Text>
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
  sectionContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  subsection: {
    marginTop: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    width: 16,
    fontSize: 14,
    color: "#FF69B4",
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
