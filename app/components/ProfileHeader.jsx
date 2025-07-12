import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileHeader = () => {
  const [username, setUsename] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsename(storedUsername);
        } else {
          setUsename('Unknown User');
        }
      } catch (error) {
        console.error('Failed to load username: ', error);
      }
    };
    fetchUsername();
  },[]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{username}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
