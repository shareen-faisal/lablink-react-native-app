import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
import useAuthRedirect from '../components/useAuthRedirect';

const Profile = () => {
  useAuthRedirect();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex:1,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <ProfileDetails />
    </ScrollView>
  );
};

export default Profile;


