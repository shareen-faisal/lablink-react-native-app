import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const SearchBar = ({isEditable, onPress, searchTerm, onchangeText})=>{
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation()

  const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.04,
    marginVertical: height * 0.01,
    borderRadius: width * 0.04, 
  },
  input: {
    flex: 1,
  },
})



  return(
    <TouchableOpacity onPress={onPress} activeOpacity={!isEditable ? 0.7 : 1}>

      <View style={styles.container} >
        <TextInput placeholder='Search name' value={searchTerm} onchangeText={onchangeText}   editable={isEditable}   pointerEvents={!isEditable ? 'none' : 'auto'} style={styles.input} />

         <Ionicons name="search" size={20} color="gray" />
      </View>
    
    </TouchableOpacity>
  )
}


export default SearchBar;