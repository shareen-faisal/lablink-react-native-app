import React from 'react';
import { StyleSheet, Text } from 'react-native';

const PageHeader = () => (
  <>
    <Text style={styles.header}>Admin Dashboard</Text>
    <Text style={styles.greeting}>
      {/* Hello! <Text style={styles.bold}>Admin</Text> */}
    </Text>
  </>
);

export default PageHeader;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  greeting: {
    marginLeft: 20,
    fontSize: 14,
    marginBottom: 10,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
});
