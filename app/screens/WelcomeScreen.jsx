// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React from 'react';
// import { StyleSheet, View } from 'react-native';

// import AppTitle from '../components/AppTitle';
// import LoginButton from '../components/LoginButton';
// import Subtitle from '../components/Subtitle';

// const WelcomeScreen = () => {
//   const navigation = useNavigation();

//   const handleCustomerLogin = () => {
//     navigation.navigate('Login');
//   };

//   const handleCustomerSignup = () => {
//     navigation.navigate('Signup'); 
//   };

//   return (
//     <LinearGradient colors={['#a0d4ff', '#0066ff']} style={styles.container}>
//       <View style={styles.centerContent}>
//         <AppTitle />
//         <Subtitle />

//         <View style={styles.buttonWrapper}>
//           <LoginButton title="Login" onPress={handleCustomerLogin} />
//           <LoginButton title="Sign Up" onPress={handleCustomerSignup} />
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//   },
//   buttonWrapper: {
//     width: '100%',
//     marginTop: 40,
//     gap: 16,
//   },
// });

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AppTitle from '../components/AppTitle';
import LoginButton from '../components/LoginButton';
import Subtitle from '../components/Subtitle';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleCustomerLogin = () => {
    navigation.navigate('Login');
  };

  const handleCustomerSignup = () => {
    navigation.navigate('Signup');
  };

  return (
  
  <View style={styles.container} >

      <View style={styles.centerContent}>
      <Image source={require('../../assets/images/logo12.png')} style={styles.logo} />

        <AppTitle />
        <Subtitle />

        <View style={styles.buttonWrapper}>
          <LoginButton title="Login" onPress={handleCustomerLogin} style={styles.primaryButton} />
          <LoginButton title="Sign Up" onPress={handleCustomerSignup} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
        </View>
      </View>
      
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 50, 
  },
  logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    marginBottom: 30,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 60, 
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#0044cc', 
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#0044cc',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#0044cc',
  },
});