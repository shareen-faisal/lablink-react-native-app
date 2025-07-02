import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';

const Profile = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex:1,
    },
  });
  


  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* <BackButton onPress={handleBack} /> */}
      <ProfileHeader />
      <ProfileDetails />
    </ScrollView>
  );
};

export default Profile;


