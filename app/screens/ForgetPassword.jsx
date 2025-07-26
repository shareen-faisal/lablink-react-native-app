import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { FIREBASE_AUTH_FORGETPASSWORD_URL } from '../../config';
import AppInput from '../components/AppInput';
import BackButton from '../components/BackButton';
import LoginHeader from '../components/LoginHeader';
import PrimaryButton from '../components/PrimaryButton';

const Customer_ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePasswordReset = async () => {
    if (!isEmailValid(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email format.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(FIREBASE_AUTH_FORGETPASSWORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const firebaseError = data.error?.message;

        if (firebaseError === 'EMAIL_NOT_FOUND') {
            Toast.show({
                type: 'error',
                text1: 'Email not registered',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: firebaseError || 'Something went wrong!',
            });
        }
      } else {
        Toast.show({
            type: 'success',
            text1: 'Password reset email sent!'
          });
    
        navigation.navigate('Login');
      }
      
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={handleBack}/>
      </View>

      <View style={styles.content}>
        <LoginHeader title="Forgot Password?"/>

        <AppInput
        icon="mail-outline"
        placeholder='Enter your email'
        value={email}
        onChangeText={(e) => setEmail(e)}
        keyboardType="email-address"
        />

        {loading ? (
            <ActivityIndicator size="large" color="#3b7cff" style={{ marginTop: 20 }} />
            ) : (
            <PrimaryButton
            title="Reset Password"
            onPress={handlePasswordReset}
            />
        )}
      </View>
    </View>
  );
};

export default Customer_ForgetPassword;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 80,
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex:999,
  },
});
