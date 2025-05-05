import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const NOTIFICATION_SETTINGS = [
  {
    id: 'bookings',
    title: 'Booking Notifications',
    description: 'New booking requests and confirmations',
    items: [
      { id: 'new_bookings', title: 'New Booking Requests', enabled: true },
      { id: 'booking_updates', title: 'Booking Status Updates', enabled: true },
      { id: 'booking_reminders', title: 'Upcoming Booking Reminders', enabled: true },
    ]
  },
  {
    id: 'payments',
    title: 'Payment Notifications',
    description: 'Payment received and transaction updates',
    items: [
      { id: 'payment_received', title: 'Payment Received', enabled: true },
      { id: 'payment_failed', title: 'Payment Failed', enabled: true },
      { id: 'payout_updates', title: 'Payout Updates', enabled: true },
    ]
  },
  {
    id: 'messages',
    title: 'Message Notifications',
    description: 'Customer messages and inquiries',
    items: [
      { id: 'new_messages', title: 'New Messages', enabled: true },
      { id: 'message_reminders', title: 'Message Reminders', enabled: false },
    ]
  },
  {
    id: 'promotions',
    title: 'Marketing & Promotions',
    description: 'Updates about offers and promotions',
    items: [
      { id: 'app_updates', title: 'App Updates', enabled: true },
      { id: 'promotions', title: 'Promotional Offers', enabled: false },
      { id: 'newsletters', title: 'Newsletters', enabled: false },
    ]
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(NOTIFICATION_SETTINGS);

  const toggleNotification = (sectionId, itemId) => {
    setSettings(prevSettings => 
      prevSettings.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map(item => 
              item.id === itemId 
                ? { ...item, enabled: !item.enabled }
                : item
            )
          };
        }
        return section;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackgroundShapes />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {settings.map(section => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionDescription}>{section.description}</Text>
            
            <View style={styles.card}>
              {section.items.map(item => (
                <View key={item.id} style={styles.settingRow}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Switch
                    value={item.enabled}
                    onValueChange={() => toggleNotification(section.id, item.id)}
                    trackColor={{ false: "#e0e0e0", true: "#FFB6D9" }}
                    thumbColor={item.enabled ? "#FF69B4" : "#f4f3f4"}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: 4,
    },
    sectionDescription: {
      fontSize: 14,
      color: "#666",
      marginBottom: 12,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    settingTitle: {
      fontSize: 14,
      color: "#1a1a1a",
    },
  });