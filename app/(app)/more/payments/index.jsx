import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackgroundShapes from "../../../components/BackgroundShapes";

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    amount: '45,000',
    type: 'credit',
    date: '15 Apr 2024',
    time: '6:30 PM',
    description: 'Payment received for Wedding Booking',
    venueName: 'Royal Wedding Palace',
    customerName: 'Rahul Sharma',
    paymentMethod: 'Razorpay',
    transactionId: 'rzp_123456789',
  },
  {
    id: '2',
    amount: '35,000',
    type: 'credit',
    date: '20 Apr 2024',
    time: '11:30 AM',
    description: 'Payment received for Reception Booking',
    venueName: 'Green Valley Resort',
    customerName: 'Priya Patel',
    paymentMethod: 'Stripe',
    transactionId: 'pi_123456789',
  },
];

export default function PaymentsScreen() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('April 2024');

  const renderTransactionCard = (transaction) => (
    <TouchableOpacity 
      key={transaction.id}
      style={styles.transactionCard}
      onPress={() => router.push(`/(app)/more/payments/${transaction.id}`)}
    >
      <View style={styles.transactionHeader}>
        <View>
          <Text style={styles.amount}>₹{transaction.amount}</Text>
          <Text style={styles.description}>{transaction.description}</Text>
        </View>
        <View style={[
          styles.typeBadge,
          transaction.type === 'credit' ? styles.creditBadge : styles.debitBadge
        ]}>
          <Text style={[
            styles.typeText,
            transaction.type === 'credit' ? styles.creditText : styles.debitText
          ]}>
            {transaction.type === 'credit' ? 'Received' : 'Paid'}
          </Text>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{transaction.date}, {transaction.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{transaction.venueName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{transaction.customerName}</Text>
        </View>

        <View style={styles.paymentInfo}>
          <View style={styles.detailRow}>
            <Text style={styles.paymentLabel}>Payment via</Text>
            <Text style={styles.paymentMethod}>{transaction.paymentMethod}</Text>
          </View>
          <Text style={styles.transactionId}>TXN ID: {transaction.transactionId}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackgroundShapes />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#FF69B4" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Month</Text>
        <Text style={styles.totalAmount}>₹80,000</Text>
        <Text style={styles.summarySubtitle}>Total Earnings</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{selectedMonth}</Text>
        {MOCK_TRANSACTIONS.map(renderTransactionCard)}
      </ScrollView>
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
    filterButton: {
      padding: 8,
    },
    summaryCard: {
      margin: 16,
      padding: 18,
      backgroundColor: "#FF69B4",
      borderRadius: 12,
      alignItems: "center",
    },
    summaryTitle: {
      fontSize: 14,
      color: "rgba(255,255,255,0.8)",
      marginBottom: 8,
    },
    totalAmount: {
      fontSize: 32,
      fontWeight: "700",
      color: "#fff",
      marginBottom: 4,
    },
    summarySubtitle: {
      fontSize: 14,
      color: "rgba(255,255,255,0.8)",
    },
    content: {
      flex: 1,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: 16,
    },
    transactionCard: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    transactionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    amount: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: "#666",
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    creditBadge: {
      backgroundColor: "#E8F5E9",
    },
    debitBadge: {
      backgroundColor: "#FFEBEE",
    },
    typeText: {
      fontSize: 12,
      fontWeight: "500",
    },
    creditText: {
      color: "#4CAF50",
    },
    debitText: {
      color: "#F44336",
    },
    transactionDetails: {
      gap: 8,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    detailText: {
      fontSize: 14,
      color: "#666",
    },
    paymentInfo: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
    },
    paymentLabel: {
      fontSize: 14,
      color: "#666",
    },
    paymentMethod: {
      fontSize: 14,
      fontWeight: "500",
      color: "#1a1a1a",
    },
    transactionId: {
      fontSize: 12,
      color: "#999",
      marginTop: 4,
    },
  });