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
        <Image source={require('../../assets/images/logo12.png')} style={styles.logo} resizeMode='contain' />
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
    width: 40,
    height: 40,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
