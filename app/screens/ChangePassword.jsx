import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

import { FIREBASE_AUTH_CHANGEPASSWORD_URL, FIREBASE_AUTH_SIGNIN_URL } from '@/config';
import FormTitle from '../components/FormTitle';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [hideOld, setHideOld] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'All fields must be filled!',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'New passwords do not match!',
      });
      return;
    }

    setLoading(true);

    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        throw new Error("User email not found!");
      }
      
      const signInResponse = await fetch(FIREBASE_AUTH_SIGNIN_URL, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: oldPassword,
          returnSecureToken: true,
        }),
      });

      const signInData = await signInResponse.json();

      if (!signInResponse.ok) {
        throw new Error(signInData.error?.message || 'Re-authentication failed');
      }
      const idToken = signInData.idToken;

      const changePasswordResponse = await fetch(FIREBASE_AUTH_CHANGEPASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          password: newPassword,
          returnSecureToken: true,
        }),
      });

      const changePasswordData = changePasswordResponse.json();
      
      if (!changePasswordResponse.ok) {
        throw new Error(changePasswordData.error?.message || 'Password update failed');
      }

      Toast.show({
        type: 'success',
        text1: 'Password changed successfully!',
      });

      // Logout user after password is changed
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.header}>Change Password</Text>

          <View style={styles.formWrapper}>
            <FormTitle title="Change Password" />

            <PasswordInput
              placeholder="Enter old password"
              value={oldPassword}
              onChangeText={setOldPassword}
              hidePass={hideOld}
              setHidePass={setHideOld}
            />

            <PasswordInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              hidePass={hideNew}
              setHidePass={setHideNew}
            />

            <PasswordInput
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              hidePass={hideConfirm}
              setHidePass={setHideConfirm}
            />

            <View style={styles.buttonWrapper}>
              {loading ? (
                <ActivityIndicator size="large" color="#3b7cff" />
              ) : (
                <PrimaryButton title="Save Changes" onPress={handleSave} />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    marginTop: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b7cff',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  formWrapper: {
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
});
