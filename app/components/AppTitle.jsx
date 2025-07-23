import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppTitle = () => {
  return <Text style={styles.title}>Lab Link</Text>;
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
});
