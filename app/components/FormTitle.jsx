import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FormTitle = ({ title }) => (
  <>
    <View style={styles.bar} />
    <Text style={styles.title}>{title}</Text>
  </>
);

export default FormTitle;

const styles = StyleSheet.create({
  bar: {
    width: 40,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
});
