import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { BASE_URL } from '../../config';
import LabTestList from '../components/LabTestList';



const SearchResults = ({navigation})=>{
  const {height,width} = useWindowDimensions();
  const [searchInput,setSearchInput] = useState('');
  const [loading,setLoading] = useState(false)
  const [labtests,setLabtests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);

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

  useEffect(()=>{
    fetchLabTests()
  },[])

  useEffect(()=>{

    const results = labtests.filter((item)=>(
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    ))
  
    const searchResults = results.map((item) => {
      let image;
    
      if (item.category === 'Blood Tests') {
        image = require('../../assets/images/bloodTestCategoryImg.png');
      } else if (item.category === 'Heart Health Tests') {
        image = require('../../assets/images/heartHealthTestCategoryImg.png');
      } else if (item.category === 'Liver Function Tests') {
        image = require('../../assets/images/liverTestImg.png');
      } else if (item.category === 'Kidney Tests') {
        image = require('../../assets/images/kidneyTestImg.png');
      } else if (item.category === 'Diabetes Tests') {
        image = require('../../assets/images/diabetesTestImg.png');
      }
    
      return image ? { ...item, image } : item;
    });

    setFilteredTests(searchResults)

  },[searchInput,labtests])

  return(

          <View style={styles.container} >

            <View style={styles.bar} >
              <TextInput placeholder='Search name' value={searchInput} onChangeText={(value)=>(setSearchInput(value))} maxLength={100} style={styles.input} />
              <Ionicons name="search" size={20} color="gray" />
            </View>

            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3b7cff" />
              </View>
            ) : (
              searchInput!=='' && <LabTestList data={filteredTests} onPress={(item) => navigation.navigate('LabTestDetails', { labtest: item })} /> 
            )}

          </View>
  )
}

export default SearchResults;





















































