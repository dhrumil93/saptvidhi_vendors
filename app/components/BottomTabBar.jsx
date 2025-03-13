import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

const TabButton = ({ label, icon, isActive, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <Ionicons
      name={icon}
      size={24}
      color={isActive ? '#8B5CF6' : '#94A3B8'}
    />
    <Text style={[
      styles.tabLabel,
      { color: isActive ? '#8B5CF6' : '#94A3B8' }
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BottomTabBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { label: 'Home', icon: 'home', path: '/home' },
    { label: 'Ideas', icon: 'bulb-outline', path: '/ideas' },
    { label: 'Matches', icon: 'heart', path: '/matches' },
    { label: 'Received', icon: 'heart-outline', path: '/received' },
    { label: 'Accepted', icon: 'phone-portrait-outline', path: '/accepted' },
    { label: 'Sky', icon: 'chatbubble-outline', path: '/sky' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.path}
          label={tab.label}
          icon={tab.icon}
          isActive={pathname === tab.path}
          onPress={() => router.push(tab.path)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomTabBar; 