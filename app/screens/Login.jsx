import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { BASE_URL, FIREBASE_AUTH_SIGNIN_URL } from '../../config';

import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import BackButton from '../components/BackButton';
import BottomForgetPasswordText from '../components/BottomForgetPasswordText';
import BottomSignupText from '../components/BottomSignupText';
import { CartContext } from '../components/CartContext';
import LoginHeader from '../components/LoginHeader';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';

const ADMIN_EMAIL = 'admin@lablink.com';

const Customer_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const {setCart} = useContext(CartContext)

  const navigation = useNavigation();

  const loginHandler = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please enter all fields',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(FIREBASE_AUTH_SIGNIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Login failed');
      }

      // Store user token & ID in AsyncStorage
      const { localId, email: userEmail, idToken } = data;
      const role = data.email === ADMIN_EMAIL ? 'admin' : 'user';

      const dbResponse = await fetch(`${BASE_URL}/users/${localId}/name.json?auth=${idToken}`);

      const name = await dbResponse.json();

      if (!name) {
        throw new Error('Name not found in database');
      }

      const phoneNumberResponse = await fetch(`${BASE_URL}/users/${localId}/phoneNumber.json?auth=${idToken}`);

      const phoneNumber = await phoneNumberResponse.json();

      if (!phoneNumber) {
        throw new Error('phoneNumber not found in database');
      }


      // const storeName = async () => {
      //   try {
      //     const response = await fetch(`${BASE_URL}/users/${localId}/name.json`);
      //     const fetchedName = await response.json();
          
      //     if (fetchedName) {
      //       await AsyncStorage.setItem('name', fetchedName);
      //     }
      //   } catch (error) {
      //     console.error('Failed to fetch name:', error)
      //   }
      // }

      // await storeName();
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userToken', idToken);
      await AsyncStorage.setItem('userId', localId);
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);

      const fetchCart = async ()=>{
        const response = await fetch(`${BASE_URL}/cart/${localId}.json?auth=${idToken}`)
        const data = await response.json()
        setCart(
          (data || []).map(item => ({
            ...item,
            // date: new Date(item.date),
            date: item.date,

          }))
        );
        
      }
      await fetchCart()

      Toast.show({ 
        type: 'success',
        text1: 'Login Successful!',
        text2: role === 'admin' ? 'Welcome Admin!' : '',
      });

      setLoading(false);
      if (role === 'admin') {
        navigation.navigate('AdminStack', { screen: 'AdminDashboard' });
      } else {
        navigation.navigate('BottomTab');
        
      }
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      });
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup')
  };

  const handleForgetPassword = () => {
    navigation.navigate('Forget Password');
  };

  const handleBack = () => {
    navigation.goBack()
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={styles.content}>
        <LoginHeader title="Login" />

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
        />

        {loading ? (
          <ActivityIndicator size="large" color="#3b7cff" style={{ marginTop: 20 }} />
        ) : (
          <PrimaryButton title="Login" onPress={loginHandler} />
        )}

        <BottomForgetPasswordText onPress={handleForgetPassword}/>
        <BottomSignupText onPress={handleSignup} />
      </View>
    </SafeAreaView>
  );
};

export default Customer_Login;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex:999,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 80,
  },
});
