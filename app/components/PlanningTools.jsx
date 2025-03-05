import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ToolCard = ({ title, value, subtitle, onPress }) => (
  <TouchableOpacity style={styles.toolCard} onPress={onPress}>
    <Text style={styles.toolValue}>{value}</Text>
    <Text style={styles.toolTitle}>{title}</Text>
    <Text style={styles.toolSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const PlanningTools = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wedding Planning Tools</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.toolsContainer}>
        <ToolCard
          value="10"
          title="Your Digital Invites"
          subtitle="Not Published"
          onPress={() => {}}
        />
        <ToolCard
          value="15"
          title="Your Shortlisted Vendors"
          subtitle="Browse"
          onPress={() => {}}
        />
        <ToolCard
          value="5"
          title="Your RFQ"
          subtitle="Browse"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#8B5CF6',
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  toolValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  toolTitle: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#8B5CF6',
  },
});

export default PlanningTools; 