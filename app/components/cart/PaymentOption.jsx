import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const PaymentOption = ({ title, discount, isSelected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.paymentOption, isSelected && styles.selectedPayment]}
    onPress={onSelect}
  >
    <View style={styles.radioButton}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
    <View>
      <Text style={styles.paymentOptionText}>{title}</Text>
      {discount && <Text style={styles.discountText}>Save ₹{discount}</Text>}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedPayment: {
    backgroundColor: '#FFE8EF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4D8D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4D8D',
  },
  paymentOptionText: {
    fontSize: 14,
    color: '#333',
  },
  discountText: {
    fontSize: 12,
    color: '#FF4D8D',
    marginTop: 4,
  },
});

export default PaymentOption;