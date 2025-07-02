import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import LabTestList from '../components/LabTestList';


const SearchResults = ({navigation})=>{
  const {height,width} = useWindowDimensions();
  const [searchInput,setSearchInput] = useState('');

  const styles = StyleSheet.create({
    container:{
       padding: width * 0.05,
       backgroundColor: '#fff',
       flex:1,
    },
    bar:{
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      borderRadius:'',
      paddingVertical: height * 0.005,
      paddingHorizontal: width * 0.04,
      marginVertical: height * 0.01,
      borderRadius: width * 0.04, 
    },
    input: {
      flex: 1,
    },
  })

  const testData = [
    { id: '1', name: 'Complete Blood Count', price: 500, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
    { id: '2', name: 'Liver Function Test', price: 800, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
    { id: '3', name: 'COVID-19 PCR', price: 1500, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
  ];

  const searchResults = testData.filter((item)=>(
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  ))

  const labtest = 
  {
    name: "Hb",
    price: 100,
    description: "Custom logo design with 3 initial concepts",
    sampleRequired: "Client must provide design inspiration or references",
    turnaroundTime: "3 days",
    gender: "This test is for both genders",
    image: "https://https://www.istockphoto.com/vector/drop-gm1081786788-290097354.com/images/logo-design.png"
  }
  
  return(



            <View style={styles.container} >

            <View style={styles.bar} >
            <TextInput placeholder='Search name' value={searchInput} onChangeText={(value)=>(setSearchInput(value))} style={styles.input} />
            <Ionicons name="search" size={20} color="gray" />
            </View>

            {searchInput!=='' && <LabTestList data={searchResults} onPress={()=>(navigation.navigate('LabTestDetails',labtest))} /> }

            </View>




    

  )
}

export default SearchResults;





















































