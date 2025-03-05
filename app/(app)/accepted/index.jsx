import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundShapes from '../../components/BackgroundShapes';

export default function AcceptedScreen() {
  return (
    <View style={styles.container}>
      <BackgroundShapes />
      <Text style={styles.text}>Accepted Screen</Text>
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