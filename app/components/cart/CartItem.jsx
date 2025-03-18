import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CartItem = ({ title, price, onIncrement, onDecrement, quantity }) => (
  <View style={styles.cartItem}>
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemPrice}>₹{price}/person</Text>
    </View>
    <View style={styles.quantityControl}>
      <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE8EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#FF4D8D',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    color: '#333',
  },
});

export default CartItem;