import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Subtitle = () => {
  return (
    <Text style={styles.subtitle}>Connecting you to better health.</Text>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 60,
    textAlign: 'center',
  },
});
