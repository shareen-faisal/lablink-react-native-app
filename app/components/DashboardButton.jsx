import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const DashboardButton = ({ iconName, label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name={iconName} size={32} color="#fff" />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default DashboardButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    backgroundColor: '#3b7cff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
});
