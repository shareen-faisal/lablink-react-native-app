import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../config';

import CategoryDropdown from '../components/CategoryDropdown';
import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import HalfInputRow from '../components/HalfInputRow';
import PageHeader from '../components/PageHeader';
import SampleDropdown from '../components/SampleDropdown';
import useAuthRedirect from '../components/useAuthRedirect';

const AddLabTest = () => {
  useAuthRedirect();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [turnAroundTime, setTurnAroundTime] = useState('');
  const [sampleType, setSampleType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const resetForm = () => {
    setName('');
    setPrice('');
    setTurnAroundTime('');
    setSampleType('');
    setCategory('');
    setDescription('');
  };

  const validateForm = () => {
    if (!name || !price || !turnAroundTime || !category || !sampleType.trim() || !description) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all fields!',
      });
      return false;
    }

    if (isNaN(price)) {
      Toast.show({
        type: 'error',
        text1: 'Price must be a number!',
      });
      return false;
    }

    if (price <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Price must be greater than 0!',
      });
      return false;
    }

    if (isNaN(turnAroundTime)) {
      Toast.show({
        type: 'error',
        text1: 'Turnaround time must be numeric!',
      });
      return false;
    }

    if (turnAroundTime <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Turnaround time must be greater than 0!',
      });
      return false;
    }

    if (turnAroundTime.includes('.') || turnAroundTime.includes(',')) {
      Toast.show({
          type: 'error',
          text1: 'Turnaround time cannot be a decimal value!',
      });
      return false;
  }

    if (name.length > 100) { 
      Toast.show({
        type: 'error',
        text1: 'Name is too long.',
      });
      return false;
    }

    if (description.length > 500) {
      Toast.show({
        type: 'error',
        text1: `Description is too long (max 500 characters).`,
      });
      return false;
    }

    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      setLoading(false); 
      return;
    }

    setLoading(true);
    try {
      const checkDuplicate = await fetch(`${BASE_URL}/labTests.json`);
      if (!checkDuplicate.ok) {
        throw new Error('Failed to check for duplicates');
      }

      const existingTests = await checkDuplicate.json();
      const nameExists = existingTests &&
        Object.values(existingTests).some((test) =>
          test.name.trim().toLowerCase() === name.trim().toLowerCase()
        );

      if (nameExists) {
        Toast.show({
          type: 'error',
          text1: `Test named '${name}' already exists!`,
        });
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/labTests.json`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          turnAroundTime,
          sampleType,
          category,
          description,
        }),
      });

      if (!response.ok) throw new Error('Failed to add lab test');

      Toast.show({
        type: 'success',
        text1: 'Lab Test added successfully!',
      });

      resetForm();
      navigation.navigate('AdminDashboard');

    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhiteTap = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

        <View style={styles.container}>

          <View style={styles.formHeader}>
            <FormTitle title="Add Lab Test" />
          </View>

          <ScrollView
            style={styles.scrollViewContent}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <FormInput
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
              />

              <HalfInputRow
                leftLabel="Price"
                leftValue={price}
                onLeftChange={setPrice}
                rightLabel="Turn Around Time"
                rightValue={turnAroundTime}
                onRightChange={setTurnAroundTime}
              />
              
              <SampleDropdown selected={sampleType} onSelect={setSampleType} />

              <CategoryDropdown selected={category} onSelect={setCategory} />

              <FormInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                placeholder="Enter detailed description"
                style={styles.descriptionBox}
              />

              <View style={styles.buttonContainer}>
                {loading ? (
                  <View style={styles.loadingButton}>
                    <Text style={styles.loadingText}>Adding...</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.shrunkButton} onPress={handleAdd}>
                    <Text style={styles.shrunkButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footerSpacer} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddLabTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b7cff', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  whiteHeaderArea: {
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flex: 1, 
  },
  scrollContainer: {
    flexGrow: 1, 
    paddingBottom: 30, 
  },
  formHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    minHeight: 62,
  },
  formContainer: {
    flexGrow: 1,  
    paddingHorizontal: 20,
  },
  descriptionBox: {
    textAlignVertical: 'top',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
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
    height: 50,
    backgroundColor: '#3b7cff',
  },
  loadingButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 24,
    elevation: 2,
  },
  loadingText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
