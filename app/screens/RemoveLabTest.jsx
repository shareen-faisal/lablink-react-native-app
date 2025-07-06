import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  FlatList, Keyboard
} from 'react-native';
import Toast from 'react-native-toast-message';

import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import PageHeader from '../components/PageHeader';

import {
  db,
  ref,
  onValue,
  remove
} from '../../services/backend';

const RemoveLabTest = () => {
  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [labTests, setLabTests] = useState([]);

  const navigation = useNavigation();

  // Load lab tests from Firebase
  useEffect(() => {
    const testsRef = ref(db, 'labTests');
    const unsubscribe = onValue(testsRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setLabTests(list);
    });

    return () => unsubscribe(); // clean up listener
  }, []);

  const handleWhiteTap = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleChange = (text) => {
    const input = text.trim();
    setName(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const matches = labTests.filter((item) =>
      item.name?.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (text) => {
    setName(text);
    setSuggestions([]);
  };

  const handleRemove = () => {
    const inputName = name.trim().toLowerCase();
    const match = labTests.find(
      (test) => test.name?.toLowerCase() === inputName
    );

    if (!match) {
      Toast.show({
        type: 'error',
        text1: 'Lab test not found!',
      });
      return;
    }

    remove(ref(db, `labTests/${match.id}`))
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Lab test removed successfully!',
        });
        setName('');
        setSuggestions([]);
        navigation.navigate('AdminDashboard');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Failed to remove lab test.',
        });
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleWhiteTap}>
        <View style={styles.whiteHeaderArea}>
          <PageHeader />
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{ flex: 1 }}
      >
        <View style={styles.formContainer}>
          <View style={styles.topSection}>
            <FormTitle title="Remove Lab Test" />
            <FormInput
              label="Name"
              placeholder="Enter name"
              value={name}
              onChangeText={handleChange}
            />

            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSuggestionClick(item.name)}>
                    <Text style={styles.suggestionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionBox}
              />
            )}
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
  safeArea: { flex: 1, backgroundColor: '#fff' },
  whiteHeaderArea: { backgroundColor: '#fff' },
  formContainer: {
    flex: 1,
    backgroundColor: '#3b7cff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  topSection: { marginTop: 10 },
  bottomSection: { alignItems: 'center' },
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
  suggestionBox: {
    backgroundColor: '#fff',
    maxHeight: 120,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  suggestionText: {
    paddingVertical: 8,
    fontSize: 14,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
