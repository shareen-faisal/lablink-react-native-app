import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ label, value, onToggle }) => (
  <TouchableOpacity style={styles.container} onPress={onToggle}>
    <Ionicons
      name={value ? 'radio-button-on' : 'radio-button-off'}
      size={20}
      color="#fff"
    />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  label: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
});