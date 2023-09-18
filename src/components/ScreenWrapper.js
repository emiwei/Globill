import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2e',
  },
});

export default ScreenWrapper;
