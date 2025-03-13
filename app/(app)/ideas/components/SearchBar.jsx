import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search wedding venues"
                placeholderTextColor="#999"
                onChangeText={onSearch}
            />
        </View>
        <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#333" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 8,
        fontSize: 14,
    },
    filterButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar; 