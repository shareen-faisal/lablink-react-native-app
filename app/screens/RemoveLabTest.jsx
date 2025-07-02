import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import PageHeader from '../components/PageHeader';

const RemoveLabTest = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleWhiteTap = () => {
    navigation.goBack(); // Or navigate to AdminDashboard explicitly
  };

  const handleRemove = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a valid lab test name.");
      return;
    }

    console.log(`Removing lab test with name: ${name}`);
    
    Alert.alert("Success", "Lab test removed successfully!", [
      {
        text: "OK",
        onPress: () => navigation.navigate('AdminDashboard'),
      },
    ]);
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

            {/* Spacer before the bottom nav */}
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
