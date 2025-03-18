import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
});

export default Section;