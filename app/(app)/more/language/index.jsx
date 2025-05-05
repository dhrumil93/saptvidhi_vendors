import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const LANGUAGES = [
  { id: "en", name: "English", nativeName: "English" },
  { id: "hi", name: "Hindi", nativeName: "हिंदी" },
  { id: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { id: "mr", name: "Marathi", nativeName: "मराठी" },
  { id: "bn", name: "Bengali", nativeName: "বাংলা" },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("en");

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.langCard, selectedLang === item.id && styles.selectedCard]}
      onPress={() => setSelectedLang(item.id)}
    >
      <View style={styles.langInfo}>
        <Text style={styles.nativeName}>{item.nativeName}</Text>
        <Text style={styles.langName}>{item.name}</Text>
      </View>
      {selectedLang === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#FF69B4" />
      )}
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
        <Text style={styles.title}>Select Language</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={LANGUAGES}
        renderItem={renderLanguageItem}
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
  saveButton: {
    padding: 8,
  },
  saveText: {
    color: "#FF69B4",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  langCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  selectedCard: {
    borderColor: "#FF69B4",
    borderWidth: 2,
  },
  langInfo: {
    gap: 4,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  langName: {
    fontSize: 14,
    color: "#666",
  },
});
