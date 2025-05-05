import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LogoutDialog from "../../components/LogoutDialog";
// import BottomTabBar from "../../components/BottomTabBar";
import BackgroundShapes from "../../components/BackgroundShapes";

const MENU_ITEMS = {
  profile: {
    title: "Personal",
    items: [
      {
        id: "inbox",
        title: "Inbox",
        icon: "business",
        showArrow: true,
      },
      {
        id: "subscription",
        title: "My Subscription",
        icon: "card",
        type: "plan",
        subtitle: "Free Plan",
        showArrow: true,
        highlight: true,
      },
    ],
  },
  services: {
    title: "Services",
    items: [
      { id: "venues", title: "My Venues", icon: "location", showArrow: true },
      {
        id: "bookings",
        title: "My Bookings",
        icon: "calendar",
        showArrow: true,
      },
      {
        id: "payments",
        title: "Payment History",
        icon: "cash",
        showArrow: true,
      },
    ],
  },
  preferences: {
    title: "Preferences",
    items: [
      {
        id: "notifications",
        title: "Notifications",
        icon: "notifications",
        showArrow: true,
      },
      { id: "language", title: "Language", icon: "language", showArrow: true },
      {
        id: "support",
        title: "Help & Support",
        icon: "help-circle",
        showArrow: true,
      },
    ],
  },
  about: {
    title: "About",
    items: [
      {
        id: "privacy",
        title: "Privacy Policy",
        icon: "shield",
        showArrow: true,
      },
      {
        id: "terms",
        title: "Terms & Conditions",
        icon: "document-text",
        showArrow: true,
      },
      {
        id: "version",
        title: "App Version",
        icon: "information-circle",
        value: "1.0.0",
      },
    ],
  },
};

export default function SettingsScreen() {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleMenuPress = (id) => {
    router.push(`/(app)/more/${id}`);
  };

  const renderMenuItem = (item) => {
    if (item.type === "plan") {
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, styles.planItem]}
          onPress={() => handleMenuPress(item.id)}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon} size={24} color="#FF69B4" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.planTitle}>{item.title}</Text>
              <Text style={styles.planSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={() => handleMenuPress(item.id)}
      >
        <View style={styles.menuItemLeft}>
          <Ionicons name={item.icon} size={24} color="#666" />
          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>
        {item.value ? (
          <Text style={styles.menuItemValue}>{item.value}</Text>
        ) : (
          item.showArrow && (
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          )
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <BackgroundShapes />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://api.dicebear.com/7.x/avataaars/png?seed=vendor",
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Business Name</Text>
            <Text style={styles.profilePhone}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleMenuPress("profile")}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {Object.entries(MENU_ITEMS).map(([key, section]) => (
          <View key={key} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderMenuItem)}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutDialog(true)}
        >
          <MaterialIcons name="logout" size={24} color="#FF69B4" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <LogoutDialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={() => router.replace("/(app)/home")}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  profilePhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FF69B4",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    paddingHorizontal: 24,
    textTransform: "uppercase",
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 12,
  },
  menuItemTextContainer: {
    marginLeft: 12,
  },
  planItem: {
    backgroundColor: "#FFF0F7",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  planSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  menuItemValue: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutText: {
    color: "#FF69B4",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});
