import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../components/BackgroundShapes";

const checklistData = [
    {
        id: 1,
        title: "1 Month to Go",
        isExpanded: true,
        tasks: [
            { id: 1, text: "Browse and save outfit photos", completed: false },
            { id: 2, text: "Decide wedding budget", completed: false },
            { id: 3, text: "Research Venue options", completed: false },
            { id: 4, text: "Estimate guest count", completed: false },
            { id: 5, text: "Research Wedding Planners", completed: false },
        ]
    },
    {
        id: 2,
        title: "2 Weeks to Go",
        isExpanded: false,
        tasks: []
    },
    {
        id: 3,
        title: "1 week to Go",
        isExpanded: false,
        tasks: []
    },
    {
        id: 4,
        title: "3 days to Go",
        isExpanded: false,
        tasks: []
    },
    {
        id: 5,
        title: "0 day to go",
        isExpanded: false,
        tasks: []
    },
    {
        id: 6,
        title: "Post Wedding",
        isExpanded: false,
        tasks: []
    },
    {
        id: 7,
        title: "Completed",
        isExpanded: false,
        tasks: []
    }
];

const ChecklistSection = ({ section, onToggle, onTaskToggle }) => (
    <View style={styles.section}>
        <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => onToggle(section.id)}
        >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Ionicons 
                name={section.isExpanded ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#333" 
            />
        </TouchableOpacity>
        
        {section.isExpanded && (
            <View style={styles.taskList}>
                {section.tasks.map(task => (
                    <TouchableOpacity 
                        key={task.id}
                        style={styles.taskItem}
                        onPress={() => onTaskToggle(section.id, task.id)}
                    >
                        <View style={[
                            styles.checkbox,
                            task.completed && styles.checkboxChecked
                        ]}>
                            {task.completed && (
                                <Ionicons name="checkmark" size={16} color="#FFF" />
                            )}
                        </View>
                        <Text style={[
                            styles.taskText,
                            task.completed && styles.taskTextCompleted
                        ]}>
                            {task.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )}
    </View>
);

const ChecklistScreen = () => {
    const router = useRouter();
    const [sections, setSections] = useState(checklistData);

    const handleBack = () => {
        router.back();
    };

    const toggleSection = (sectionId) => {
        setSections(sections.map(section => ({
            ...section,
            isExpanded: section.id === sectionId ? !section.isExpanded : section.isExpanded
        })));
    };

    const toggleTask = (sectionId, taskId) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    tasks: section.tasks.map(task => 
                        task.id === taskId 
                            ? { ...task, completed: !task.completed }
                            : task
                    )
                };
            }
            return section;
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <BackgroundShapes />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Checklist</Text>
            </View>

            <ScrollView style={styles.content}>
                {sections.map(section => (
                    <ChecklistSection
                        key={section.id}
                        section={section}
                        onToggle={toggleSection}
                        onTaskToggle={toggleTask}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 16,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#333',
    },
    content: {
        flex: 1,
    },
    section: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    taskList: {
        padding: 16,
        paddingTop: 0,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#FF4D8D',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#FF4D8D',
    },
    taskText: {
        fontSize: 14,
        color: '#333',
    },
    taskTextCompleted: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
});

export default ChecklistScreen; 