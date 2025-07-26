import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { BASE_URL, FIREBASE_AUTH_SIGNUP_URL } from '../../config';

import AppInput from '../components/AppInput';
import BackButton from '../components/BackButton';
import BottomLoginText from '../components/BottomLoginText';
import LoginHeader from '../components/LoginHeader';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';

const Customer_Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword  || !phoneNumber) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required!',
      });
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/; 
    if (!nameRegex.test(name)) {
      Toast.show({
        type: 'error',
        text1: 'Name must contain only alphabets.',
      });
      return; 
    }

    if (name.length>30) {
      Toast.show({
        type: 'error',
        text1: 'Name should not be greater than 30 characters!',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email address!',
      });
      return;
    }

    const containsOnlyDigits = /^[0-9]+$/.test(phoneNumber);
    if (!containsOnlyDigits) {
      Toast.show({
        type: 'error',
        text1: 'Phone number must contain only numbers.',
      });
      return; 
    }

    if (phoneNumber.length !== 11) {
      Toast.show({
        type: 'error',
        text1: 'Phone number must be exactly 11 digits long.',
      });
      return;
    }

    if (password.length<6) {
      Toast.show({
        type: 'error',
        text1: 'Length of password should be atleast 6!',
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

    setLoading(true);
    try {

      const usersResponse = await fetch(`${BASE_URL}/users.json`);
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch existing users for phone number check.');
      }
      const existingUsers = await usersResponse.json();

      if (existingUsers) {
        const phoneNumberExists = Object.values(existingUsers).some(
          (user) => user.phoneNumber === phoneNumber
        );
        if (phoneNumberExists) {
          Toast.show({
            type: 'error',
            text1: 'This phone number is already registered!',
          });
          setLoading(false);
          return;
        }
      }

      const response = await fetch(FIREBASE_AUTH_SIGNUP_URL, {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });
      
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || 'Something went wrong!';
        throw new Error(errorMessage);
      }
      
      Toast.show({
        type: 'success',
        text1: 'Signed up successfully!',
      });
      await fetch(`${BASE_URL}/users/${data.localId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email,phoneNumber }),
      });
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      setLoading(false);
    }
  };

  const handleLoginNavigate = () => {
    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={styles.content}>
        <LoginHeader title="Sign Up" />

        <AppInput
          icon="person-outline"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          keyboardType='default'
        />

        <AppInput
          icon="mail-outline"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <AppInput
          icon="call-outline" 
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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

        {loading ? (
          <ActivityIndicator size={'large'} color={'#3b7cff'}/>
        ) : (
          <PrimaryButton title="Sign Up" onPress={submitHandler} />
        )}

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
    top: 20,
    left: 20,
    zIndex:999,
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 80,
  },
});
