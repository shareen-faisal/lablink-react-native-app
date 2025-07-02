import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import AppInput from '../components/AppInput';
import BackButton from '../components/BackButton';
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
      Toast.show({
        type: 'error',
        text1: 'All fields are required!',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match!',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Signed up successfully!',
    });

    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  };

  const handleLoginNavigate = () => {
    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 👇 Same back button spacing as Login screen */}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={styles.content}>
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
    </View>
  );
};

export default Customer_Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  backButtonWrapper: {
    marginTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 80,
  },
});
