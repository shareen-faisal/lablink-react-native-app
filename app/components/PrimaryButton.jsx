import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const PrimaryButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b7cff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
