import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'stories', label: 'Stories' },
    { id: 'realWedding', label: 'Real Wedding' },
];

const TabBar = ({ activeTab, onTabPress }) => (
    <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
            <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => onTabPress(tab.id)}
            >
                <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                    {tab.label}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    tab: {
        paddingVertical: 12,
        marginRight: 24,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF4D8D',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#FF4D8D',
        fontWeight: '600',
    },
});

export default TabBar; 