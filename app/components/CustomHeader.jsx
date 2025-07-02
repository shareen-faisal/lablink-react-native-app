import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomHeader({ showBack }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={styles.safeContainer}>
      <View style={styles.container}>
        {showBack ? (
          <TouchableOpacity onPress={() => (navigation.goBack())} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Lab Link</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#fff',
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 40,
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
