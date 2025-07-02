import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  editable = true,
  style = {},
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, style]} // Merge internal + external styles
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={editable}
    />
  </>
);

export default FormInput;

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
  },
});
