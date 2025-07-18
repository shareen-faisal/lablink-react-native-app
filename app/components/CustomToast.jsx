import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: '80%',
    maxWidth:'80%',
    alignSelf: 'center',
  },
  iconContainer: {
    borderRadius: 999,
    padding: 4,
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    flex:'wrap',
    flexShrink:1
  },
});


export default function CustomToast(props) {
  const { text1 } = props;
  const isSuccess = props.type === 'success';

  return (
    <LinearGradient
      colors={
        isSuccess
          ? ['#10B981', '#059669']
          : ['#EF4444', '#DC2626']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={[styles.iconContainer, { backgroundColor: '#FFFFFF' }]}>
        <Icon
          name={isSuccess ? 'check' : 'close'}
          size={18}
          color={isSuccess ? '#10B981' : '#EF4444'}
        />
      </View>
      <Text style={styles.text}>{text1 ?? ''}</Text>
    </LinearGradient>
  );
}
