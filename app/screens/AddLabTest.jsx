import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert, KeyboardAvoidingView,
    Platform,
    SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';

import CategoryDropdown from '../components/CategoryDropdown';
import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import HalfInputRow from '../components/HalfInputRow';
import PageHeader from '../components/PageHeader';
import RadioButton from '../components/RadioButton';

const AddLabTest = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [turnAroundTime, setTurnAroundTime] = useState('');
  const [sampleType, setSampleType] = useState('');
  const [sampleRequired, setSampleRequired] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const handleAdd = () => {
    // Logic for saving can go here (e.g. API call)

    Alert.alert('Success', 'Lab Test added successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('AdminDashboard'),
      },
    ]);
  };

  const handleWhiteTap = () => {
    navigation.goBack(); // or navigation.navigate('AdminDashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Touchable area above form (white section) */}
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <FormTitle title="Add Lab Test" />

            <FormInput
              label="Name"
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
            />

            <HalfInputRow
              leftLabel="Price"
              leftValue={price}
              onLeftChange={setPrice}
              rightLabel="Turn Around Time"
              rightValue={turnAroundTime}
              onRightChange={setTurnAroundTime}
            />

            <FormInput
              label="Sample Type"
              placeholder="Enter sample type"
              value={sampleType}
              onChangeText={setSampleType}
              editable={sampleRequired}
              style={!sampleRequired && { backgroundColor: '#ddd' }}
            />

            <RadioButton
              label="Sample Required"
              value={sampleRequired}
              onToggle={() => {
                setSampleRequired(!sampleRequired);
                if (sampleRequired) setSampleType('');
              }}
            />

            <CategoryDropdown selected={category} onSelect={setCategory} />

            <FormInput
              label="Description"
              placeholder="Enter detailed description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              style={styles.descriptionBox}
            />

            {/* Shrunk Add Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.shrunkButton} onPress={handleAdd}>
                <Text style={styles.shrunkButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Spacer for visual footer (for nav bar) */}
        <View style={styles.footerSpacer} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddLabTest;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  whiteHeaderArea: {
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#3b7cff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
