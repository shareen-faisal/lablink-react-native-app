import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import PageHeader from '../components/PageHeader';

const RemoveLabTest = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleWhiteTap = () => {
    navigation.goBack(); // or navigation.navigate('AdminDashboard')
  };

  const handleRemove = () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid lab test name.',
      });
      return;
    }

    // Simulate deletion logic
    console.log(`Removing lab test with name: ${name}`);

    Toast.show({
      type: 'success',
      text1: 'Lab test removed successfully!',
    });

    // setTimeout(() => {
      setName(''); // Reset the form
      navigation.navigate('AdminDashboard');
    // }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Touchable white area */}
      <TouchableWithoutFeedback onPress={handleWhiteTap}>
        <View style={styles.whiteHeaderArea}>
          <PageHeader />
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.formContainer}>
          <View style={styles.topSection}>
            <FormTitle title="Remove Lab Test" />

            <FormInput
              label="Name"
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.shrunkButton} onPress={handleRemove}>
              <Text style={styles.shrunkButtonText}>Remove</Text>
            </TouchableOpacity>

            <View style={styles.footerSpacer} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RemoveLabTest;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  whiteHeaderArea: {
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#3b7cff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  topSection: {
    marginTop: 10,
  },
  bottomSection: {
    alignItems: 'center',
  },
  shrunkButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 24,
    elevation: 2,
  },
  shrunkButtonText: {
    color: '#3b7cff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerSpacer: {
    height: 40,
    backgroundColor: '#3b7cff',
    width: '100%',
    marginTop: 25,
  },
});
