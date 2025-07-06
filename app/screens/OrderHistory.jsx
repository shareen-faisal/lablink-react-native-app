import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import OrderCard from '../components/OrderCard';



const OrderHistory = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const handleBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex:1,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 8,
      marginBottom: 15,
      textAlign: 'center',
    },
    cardWrapper: {
      marginTop: 30, 
      paddingBottom: 20,
    },
  });
  

  const order = {
    id: 123456,
    date: '09/07/2025, 7:30 PM',
    items: [
      { name: 'Liver Test', quantity: 1, price: 200 },
      { name: 'Heart Test', quantity: 1, price: 200 },
    ],
    total: '400 PKR',
    status: 'Delivered',
  };

  return (
    <ScrollView style={styles.container}>
      {/* <BackButton onPress={handleBack} /> */}

      <Text style={styles.header}>Order History</Text>

      <View style={styles.cardWrapper}>
        <OrderCard order={order} />
      </View>
    </ScrollView>
  );

  
};

export default OrderHistory;


