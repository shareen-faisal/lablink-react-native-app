import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DashboardHeader = ({ title }) => (
  <Text style={styles.header}>{title}</Text>
);

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});
