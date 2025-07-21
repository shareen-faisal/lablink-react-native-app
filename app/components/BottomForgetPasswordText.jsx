import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BottomLoginText = () => {
  const navigation = useNavigation();

  return (
    <Text style={styles.bottomText}>
      Forgot your password?{' '}
      <Text
        style={styles.loginLink}
        onPress={() => navigation.navigate('Forget Password')}
      >
        Forget Password
      </Text>
    </Text>
  );
};

export default BottomLoginText;

const styles = StyleSheet.create({
  bottomText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#888',
  },
  loginLink: {
    color: '#3b7cff',
    fontWeight: 'bold',
  },
});
