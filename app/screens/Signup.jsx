import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AppInput from '../components/AppInput';
import BottomLoginText from '../components/BottomLoginText';
import LoginHeader from '../components/LoginHeader';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';

const Customer_Signup = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const submitHandler = () => {
    if (!username || !phone || !password || !confirmPassword) {
      Alert.alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    Alert.alert("Signed up successfully 🎉");

    // TODO: Save user to backend/Firebase
    navigation.navigate('Login');
  };

  const handleLoginNavigate = () => {
    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.goBack(); // or navigation.navigate('WelcomeScreen')
  };

  return (
    <View style={styles.container}>
      {/* <BackButton onPress={handleBack} /> */}
      <LoginHeader title="Sign Up" />

      <AppInput
        icon="person-outline"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <AppInput
        icon="call-outline"
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        hidePass={hidePass}
        setHidePass={setHidePass}
        placeholder="Enter password"
      />

      <PasswordInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        hidePass={hideConfirmPass}
        setHidePass={setHideConfirmPass}
        placeholder="Confirm password"
      />

      <PrimaryButton title="Sign Up" onPress={submitHandler} />

      <BottomLoginText onPress={handleLoginNavigate} />
    </View>
  );
};

export default Customer_Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent:'center',
  },
});
