import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const LoginButton = ({ title, onPress, isAdmin }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isAdmin && styles.adminBtn]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b7cff',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  adminBtn: {
    backgroundColor: '#f2f2f2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
