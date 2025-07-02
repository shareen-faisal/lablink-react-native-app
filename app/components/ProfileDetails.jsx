import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileDetails = () => {
  const navigation = useNavigation();

  const details = [
    {
      icon: 'person-circle-outline',
      label: 'Edit Profile',
      editable: false,
      action: () => navigation.navigate('ProfileView'),
    },
    {
      icon: 'key-outline',
      label: 'Change Password',
      editable: false,
      action: () => navigation.navigate('Password'),
    },
    {
      icon: 'log-out-outline',
      label: 'Logout',
      editable: false,
      action: () => navigation.navigate('Welcome'),
    },
  ];

  return (
    <View style={styles.card}>
      {details.map((item, index) => (
        <TouchableOpacity
          style={[
            styles.row,
            index === details.length - 1 && { borderBottomWidth: 0 },
          ]}
          key={index}
          onPress={item.action}
        >
          <Ionicons name={item.icon} size={22} color="#3b7cff" />
          <Text style={styles.label}>{item.label}</Text>
          <Ionicons name="arrow-forward-outline" size={18} color="#3b7cff" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f5ff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});
