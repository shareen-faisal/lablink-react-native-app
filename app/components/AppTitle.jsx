import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppTitle = () => {
  return <Text style={styles.title}>Health Hub</Text>;
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
});
