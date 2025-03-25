import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundShapes from '../../components/BackgroundShapes';

export default function ReceivedScreen() {
  return (
    <View style={styles.container}>
      <BackgroundShapes />
      <Text style={styles.text}>Received Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
}); 