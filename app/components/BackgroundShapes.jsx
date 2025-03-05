import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BackgroundShapes = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background-shape.png')}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: -50,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: height * 0.25,
  }
});

export default BackgroundShapes;