import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import CategoryBox from '../components/CategoryBox';
import SearchBar from '../components/SearchBar.jsx';
import useAuthRedirect from '../components/useAuthRedirect';

const HomeScreen = ()=>{
  useAuthRedirect()

   const { width, height } = useWindowDimensions();
   const navigation = useNavigation()

   const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex:1,
    },
    heading: {
      fontWeight: 'bold',
      fontSize: width * 0.05, 
      marginBottom: height * 0.015,
    },
    wrapper:{
      width:'100%',
      justifyContent: 'space-between',
      
    },
    bannerImage:{
      width: width * 0.89,
      borderRadius: width * 0.04,
      alignSelf:'center',
      marginBottom: height*0.015,
      marginTop: height*0.015,

    }
});

  const categories = [
    {id:1,name:'Heart Health Tests',image:require('../../assets/images/heartHealthTestCategoryImg.png')},
    {id:2,name:'Blood Tests',image:require('../../assets/images/bloodTestCategoryImg.png')},
    {id:3,name:'Liver Function Tests',image:require('../../assets/images/liverTestImg.png')},
    {id:4,name:'Kidney Tests',image:require('../../assets/images/kidneyTestImg.png')},
    {id:5,name:'Diabetes Tests',image:require('../../assets/images/diabetesTestImg.png')},

  ]

  return(

    <View style={styles.container}>
      <SearchBar isEditable={false} onPress={()=>(navigation.navigate('Search'))} />

      <Image style={styles.bannerImage}  source={require('../../assets/images/banner.png')} />

      <Text style={styles.heading}>
        Categories
      </Text>

      <View style={{width:'100%'}} >

        <FlatList data={categories} numColumns={2} columnWrapperStyle={styles.wrapper}    showsVerticalScrollIndicator={false}  keyExtractor={(item)=>(item.id.toString())} renderItem={({item})=>(
          <CategoryBox name={item.name} image={item.image} onPress={()=>(navigation.navigate('Category',{category:item.name}))}  />
        )} >
        </FlatList>

      </View>

      
    </View>
  )
}

export default HomeScreen;