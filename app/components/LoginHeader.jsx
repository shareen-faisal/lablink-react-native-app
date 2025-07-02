import React from 'react';
import { StyleSheet, Text } from 'react-native';

const LoginHeader = ({ title }) => (
  <Text style={styles.title}>{title}</Text>
);

export default LoginHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
});
