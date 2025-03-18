import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SlotSelector = ({ onPress }) => (
  <TouchableOpacity style={styles.slotInput} onPress={onPress}>
    <Text style={styles.placeholderText}>Select Slot</Text>
    <Ionicons name="calendar-outline" size={24} color="#666" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  slotInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#999',
  },
});

export default SlotSelector;