import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Toast from 'react-native-toast-message';
import DashboardButton from '../components/DashboardButton';
import DashboardHeader from '../components/DashboardHeader';

const AdminDashboard = () => {
  const navigation = useNavigation();

  const handleAddLabTest = () => {
    navigation.navigate('Add');
  };

  const handleRemoveLabTest = () => {
    navigation.navigate('Remove');
  };

  const handleLogout = () => {
  Toast.show({
    type: 'success',
    text1: 'Logged out successfully!',
  });

  // setTimeout(() => {
    navigation.navigate('Welcome');
  // }, 1200);
};

  return (
    <View style={styles.container}>
      <DashboardHeader title="Admin Dashboard" />

      {/* Greeting and Logout */}
      <View style={styles.topRow}>
        <Text style={styles.greeting}>
          Hello! <Text style={styles.greetingBold}>Admin</Text>
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <DashboardButton
          iconName="add-circle-outline"
          label="Add Lab Test"
          onPress={handleAddLabTest}
        />
        <DashboardButton
          iconName="remove-circle-outline"
          label="Remove Lab Test"
          onPress={handleRemoveLabTest}
        />
      </View>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 60,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingLeft: 5,
  },
  greeting: {
    fontSize: 14,
    color: '#000',
  },
  greetingBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
