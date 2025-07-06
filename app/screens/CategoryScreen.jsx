import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import LabTestList from '../components/LabTestList';
import SearchBar from '../components/SearchBar.jsx';


export default function CategoryScreen({navigation,route}) {
    const [selectedCategory, setSelectedCategory] = useState(route.params.category);
    const {width,height} = useWindowDimensions();
    const categories = ['Blood Tests', 'Diabetes Tests', 'Heart Health Tests', 'Liver Function Tests' , 'Kidney Tests'];
    const styles = StyleSheet.create({
        container:{
            padding: width * 0.05,
            backgroundColor: '#fff',
            flex:1,
        },
        contentContainer:{
            flexDirection:'row',
            alignItems: 'center',
        },
        categoryOval: {
            paddingHorizontal: width * 0.04,
            paddingVertical: height * 0.012,
            backgroundColor: '#f0f0f0',
            borderRadius: width * 0.04,
            marginRight: width * 0.03,
            justifyContent: 'center',  
            alignItems: 'center',     
          },
          categoryText: {
            fontSize: width * 0.035,
            fontWeight: '600',
            color: '#000',
          },
          selectedBtn: {
            backgroundColor: '#3371FF',
          },
          selectedText: {
            color: '#fff',
          },
    })

    const testData = [
        { id: '1', name: 'Complete Blood Count', price: 500, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
        { id: '2', name: 'Liver Function Test', price: 800, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
        { id: '3', name: 'COVID-19 PCR', price: 1500, image:require('../../assets/images/heartHealthTestCategoryImg.png') },
    ];

      const labtest = 
      {
        id:1,
        name: "Hb",
        price: 100,
        description: "Custom logo design with 3 initial concepts",
        sampleRequired: "Client must provide design inspiration or references",
        turnaroundTime: "3 days",
        gender: "This test is for both genders",
        image: "https://https://www.istockphoto.com/vector/drop-gm1081786788-290097354.com/images/logo-design.png"
      }


  return (
    <View style={styles.container} >
        <SearchBar isEditable={false} onPress={()=>(navigation.navigate('Search'))} />

        <View style={{height:height*0.08}} > 

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} >
            {categories.map((item,index)=>(
                <TouchableOpacity key={index} onPress={()=>(setSelectedCategory(item))} style={[styles.categoryOval , selectedCategory===item && styles.selectedBtn]}  >

                    <Text style={[styles.categoryText, selectedCategory===item && styles.selectedText]} >{item}</Text>
                    
                </TouchableOpacity>
            ))}
            
        </ScrollView>

        </View>

        <LabTestList data={testData} onPress={()=>(navigation.navigate('LabTestDetails',labtest))} />

    </View >
  )
}
