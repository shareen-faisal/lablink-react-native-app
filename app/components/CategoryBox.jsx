import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const CategoryBox = ({name,image,onPress})=>{
  const {height,width} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.02,
      backgroundColor: '#fff',
      flex:1,
    },
    box:{
      backgroundColor: '#fff',
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      alignItems: 'center',
      width: width * 0.38,
      padding: width * 0.025,
      borderRadius: width * 0.04,
      height: height * 0.15, 
      justifyContent: 'center',
    },
    img:{
      width: '50%',
      height:height*0.08,
    },
    name:{
      fontSize: width * 0.035,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: height * 0.005,
    }
  })

  return(

    <View >

      <TouchableOpacity  style={styles.container}  onPress={onPress} >
          
          <View style={styles.box} >
            <Image source={image} style={styles.img} resizeMode="contain" />
            <Text style={styles.name} >{name}</Text>
          </View>
        </TouchableOpacity>

    </View>

    

  )
}

export default CategoryBox;