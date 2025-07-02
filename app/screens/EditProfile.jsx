import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform, SafeAreaView, ScrollView,
    StyleSheet, View
} from 'react-native';

import FormTitle from '../components/FormTitle';
import IconInput from '../components/IconInput';
import PrimaryButton from '../components/PrimaryButton';
import ProfileHeader from '../components/ProfileHeader';


const ProfileView = () => {
  const navigation = useNavigation();

  // Simulated current user info (replace with real data or context)
  const currentName = 'Moazam Attiq';
  const currentUsername = 'the_moazam14';
  const currentContact = '03047018018';

  const [name, setName] = useState(currentName);
  const [username] = useState(currentUsername); // Read-only
  const [contact, setContact] = useState(currentContact);

  const handleSave = () => {
    if (!name || !contact) {
      Alert.alert('All fields must be filled!');
      return;
    }

    Alert.alert('Profile Updated Successfully!', '', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Profile'),
      },
    ]);
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
          {/* <BackButton onPress={handleBack} /> */}

          <ProfileHeader />
          <FormTitle title="Edit Profile" />

          <IconInput
            icon="person-circle-outline"
            placeholder={currentName}
            value={name}
            onChangeText={setName}
          />

          <IconInput
            icon="person-outline"
            placeholder={currentUsername}
            value={username}
            editable={false} // 🔒 Disable editing
          />

          <IconInput
            icon="call-outline"
            placeholder={currentContact}
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <View style={styles.buttonWrapper}>
            <PrimaryButton title="Save Changes" onPress={handleSave} style={styles.bigButton} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  bigButton: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
});
