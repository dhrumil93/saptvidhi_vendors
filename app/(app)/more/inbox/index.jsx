import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const MOCK_MESSAGES = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Request",
    message: "Raj Patel requested to book Royal Wedding Palace for 15th April",
    time: "2 hours ago",
    unread: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=customer1",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "You received payment of ₹45,000 for booking #1234",
    time: "5 hours ago",
    unread: true,
    avatar: null,
  },
  {
    id: "3",
    type: "message",
    title: "Priya Sharma",
    message: "Is the venue available for 20th April evening?",
    time: "Yesterday",
    unread: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=customer2",
  },
];

export default function InboxScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const getIcon = (type) => {
    switch (type) {
      case "booking":
        return "calendar";
      case "payment":
        return "cash";
      case "message":
        return "chatbubble-ellipses";
      default:
        return "notifications";
    }
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={[styles.messageCard, item.unread && styles.unreadCard]}
      onPress={() => {
        // Mark as read
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === item.id ? { ...msg, unread: false } : msg
          )
        );
        router.push(`/(app)/more/inbox/${item.id}`);
      }}
    >
      <View style={styles.messageLeft}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.iconContainer}>
            <Ionicons name={getIcon(item.type)} size={24} color="#FF69B4" />
          </View>
        )}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageTitle}>{item.title}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text
          style={[styles.messageText, item.unread && styles.unreadText]}
          numberOfLines={2}
        >
          {item.message}
        </Text>
      </View>

      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
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
        <Text style={styles.title}>Inbox</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#FF69B4" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {["all", "unread", "booking", "payment"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={messages.filter(
          (msg) =>
            activeTab === "all" ||
            (activeTab === "unread" && msg.unread) ||
            msg.type === activeTab
        )}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
      />
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
  filterButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#FF69B4",
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: "#FF69B4",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    padding: 16,
  },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadCard: {
    backgroundColor: "#FFF5F9",
  },
  messageLeft: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF0F7",
    justifyContent: "center",
    alignItems: "center",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  unreadText: {
    color: "#1a1a1a",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF69B4",
    position: "absolute",
    top: 16,
    right: 16,
  },
});
