import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const PasswordInput = ({ value, onChangeText, hidePass, setHidePass, placeholder = "Enter your password" }) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={hidePass}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
        <Ionicons
          name={hidePass ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#aaa"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

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
