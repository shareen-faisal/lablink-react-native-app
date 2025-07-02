import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const AppInput = ({ icon, placeholder, value, onChangeText, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});
