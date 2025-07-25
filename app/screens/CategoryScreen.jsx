
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { BASE_URL } from '../../config';
import LabTestList from '../components/LabTestList';
import SearchBar from '../components/SearchBar.jsx';
import useAuthRedirect from '../components/useAuthRedirect';

export default function CategoryScreen({navigation,route}) {
    useAuthRedirect()
    const [selectedCategory, setSelectedCategory] = useState(route.params.category);
    const [labtests,setLabtests] = useState([]);
    const [labtestsByCategory,setLabtestsByCategory] = useState([]);
    const {width,height} = useWindowDimensions();
    const [loading,setLoading] = useState(false)
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
            backgroundColor: '#3b7cff',
          },
          selectedText: {
            color: '#fff',
          },
    })

    const fetchLabTests = async () => {
      setLoading(true); 
    
      try {
        const response = await fetch(`${BASE_URL}/labTests.json`);
        const data = await response.json();
    
        const tempArray = [];
        for (const key in data) {
          tempArray.push({
            id: key,
            name: data[key].name,
            price: data[key].price,
            turnAroundTime: data[key].turnAroundTime,
            sampleType: data[key].sampleType,
            category: data[key].category,
            description: data[key].description
          });
        }
    
        setLabtests(tempArray);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
      } finally {
        setLoading(false);
      }
    };

    const getImage = ()=>{
      return selectedCategory==='Blood Tests' ? require('../../assets/images/bloodTestCategoryImg.png') :
             selectedCategory==='Heart Health Tests' ? require('../../assets/images/heartHealthTestCategoryImg.png') :
             selectedCategory==='Liver Function Tests' ? require('../../assets/images/liverTestImg.png') :
             selectedCategory==='Kidney Tests' ? require('../../assets/images/kidneyTestImg.png') :
             selectedCategory=== 'Diabetes Tests' ? require('../../assets/images/diabetesTestImg.png') : ''
    };

    useEffect(()=>{
      fetchLabTests()
    },[])
    

    useEffect(()=>{
      const filtered = labtests.filter((item)=>(item.category===selectedCategory))
      const image = getImage()
      const updated = filtered.map((item,_)=>(
        {...item,image:image}
      ))
      setLabtestsByCategory(updated)
    },[selectedCategory,labtests])

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

        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#3b7cff" />
            </View>
          ) : (
            <LabTestList data={labtestsByCategory} onPress={(item) => navigation.navigate('LabTestDetails', { labtest: item })}/>
          )
        }

    </View >
  )
}