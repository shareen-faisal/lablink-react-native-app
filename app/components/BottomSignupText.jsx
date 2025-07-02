import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BottomSignupText = () => {
  const navigation = useNavigation();

  return (
    <Text style={styles.bottomText}>
      Don't have an account?{' '}
      <Text
        style={styles.signupLink}
        onPress={() => navigation.navigate('Signup')}
      >
        Sign Up
      </Text>
    </Text>
  );
};

export default BottomSignupText;

const styles = StyleSheet.create({
  bottomText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
  signupLink: {
    color: '#3b7cff',
    fontWeight: 'bold',
  },
});
