import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LabTestBox from './LabTestBox';


export default function LabTestList({data,onPress}) {
  return (
    <View style={styles.container} >

      {data.length===0 ? <View style={styles.emptyContainer} ><Text style={styles.emptyText} >No lab test found</Text></View> : (

            <FlatList data={data} keyExtractor={(item)=>(item.id)} renderItem={({item})=>(
              <LabTestBox name={item.name} price={item.price} image={item.image} onPress={onPress} />
            )} numColumns={2} columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16, marginTop:16, paddingHorizontal:1}} >

            </FlatList>

      )}


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600', 
  },
});