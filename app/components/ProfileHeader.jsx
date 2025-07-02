import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileHeader = () => {
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
      <Text style={styles.name}>Username</Text>
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
