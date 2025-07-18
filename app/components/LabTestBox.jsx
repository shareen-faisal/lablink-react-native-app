import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
export default function LabTestBox({name,image,price,onPress}) {
    const { width, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        container:{
            width: width * 0.40,
            height: height * 0.15,
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: width * 0.03,
            padding: width * 0.025,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 4,
        },

        image: {
            width: '50%',
            height: height * 0.08,
            resizeMode: 'contain',
            alignSelf: 'center',
          },
          name: {
            fontSize: width * 0.028,
            fontWeight: '600',
            flexShrink: 1,
            flexWrap: 'wrap',
          },
          priceBackground: {
            backgroundColor: '#E5EDFF',
            paddingVertical: height * 0.005,
            paddingHorizontal: width * 0.02,
            borderRadius: width * 0.02,
            alignSelf: 'flex-start',
          },
          price: {
            color: '#3371FF',
            fontWeight: '500',
            fontSize: width * 0.025,
          },

          rightContainer: {
            flex: 1,
            justifyContent: 'space-between',
            maxWidth: '50%',
          },

    })


  return (
    <TouchableOpacity onPress={onPress} >

      <View style={styles.container} >
              <Image  style={styles.image} source={image} ></Image>

              <View style={styles.rightContainer} >
                <Text style={styles.name} numberOfLines={4} ellipsizeMode="tail" >{name}</Text>
              
                <View style={styles.priceBackground} >
                    <Text style={styles.price} >Rs {price}</Text>
                </View>

              </View>

          </View>

    </TouchableOpacity>

    
  )
}
