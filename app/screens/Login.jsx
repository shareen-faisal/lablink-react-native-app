import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AppInput from '../components/AppInput';
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
      Alert.alert('Please enter all fields');
      return;
    }

    // Dummy login logic — replace with real backend check
    if (email === 'admin' && password === 'admin') {
      navigation.navigate('AdminStack', {
        screen: 'AdminDashboard' 
      });
    } else {
      navigation.navigate('BottomTab');
    }
  };

  const handleBack = () => {
    navigation.navigate('Welcome');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      {/* <BackButton onPress={handleBack} /> */}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 80,
  },
});
