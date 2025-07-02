import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 1,
  },
});
