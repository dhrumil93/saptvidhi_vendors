import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SectionHeader = ({ title, onViewAll, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#8B5CF6',
  },
});

export default SectionHeader; 