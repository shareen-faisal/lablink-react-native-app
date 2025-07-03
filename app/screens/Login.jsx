import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import AppInput from '../components/AppInput';
import BackButton from '../components/BackButton';
import BottomSignupText from '../components/BottomSignupText';
import LoginHeader from '../components/LoginHeader';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';

const Customer_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const navigation = useNavigation();

  const loginHandler = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please enter all fields',
      });
      return;
    }

    if (email === 'admin' && password === 'admin') {
      Toast.show({
        type: 'success',
        text1: 'Welcome Admin!',
      });
      // setTimeout(() => {
        navigation.navigate('AdminStack', {
          screen: 'AdminDashboard',
        });
      // }, 1200);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
      });
      // setTimeout(() => {
        navigation.navigate('BottomTab');
      // }, 1200);
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleBack = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      {/* 👇 Back button with margin */}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={styles.content}>
        <LoginHeader title="Login" />

        <AppInput
          icon="person-outline"
          placeholder="Enter Username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <PasswordInput
          value={password}
          onChangeText={setPassword}
          hidePass={hidePass}
          setHidePass={setHidePass}
        />

        <PrimaryButton title="Login" onPress={loginHandler} />

        <BottomSignupText onPress={handleSignup} />
      </View>
    </View>
  );
};

export default Customer_Login;

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
