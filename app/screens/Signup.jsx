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

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!username || !email || !password || !confirmPassword) {
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

    setLoading(true);
    try {
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
      
      await fetch(`${BASE_URL}/users/${data.localId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });
      if (!response.ok) {
        const errorMessage = data.error?.message || 'Something went wrong!';
        throw new Error(errorMessage);
      }

      Toast.show({
        type: 'success',
        text1: 'Signed up successfully!',
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
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <AppInput
          icon="mail-outline"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
