import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1.5,
    // borderColor:  '#FFA500',
    alignSelf: 'center',
    minWidth: '80%',
    maxWidth: '80%',
    overflow: 'hidden',
  },
  svgBlob: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    width: 100,
    height: 100,
  },
  iconContainer: {
    backgroundColor: '#EF4444',
    borderRadius: 999,
    padding: 6,
    marginRight: 12,
    zIndex: 1,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
    zIndex: 1,
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
      style={[ styles.container, { borderColor: isSuccess ? '#10B981' : '#FFA500' } ]}
    >
      <Svg style={styles.svgBlob} viewBox="0 0 100 100">
        <Path
          d="M0,60 C20,80 40,100 70,80 C90,60 80,20 50,20 C20,20 0,40 0,60"
          fill={isSuccess ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 87, 34, 0.5)'}  
        />
      </Svg>

      <View style={[styles.iconContainer, { backgroundColor: '#FFFFFF' }]}>
        <Icon
          name={isSuccess ? 'check' : 'close'}
           size={18}
          color={isSuccess ? '#10B981' : '#EF4444'}         />
      </View>

      <Text style={styles.text}>{text1 ?? ''}</Text>
    </LinearGradient>
  );
}