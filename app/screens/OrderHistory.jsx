import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { BASE_URL } from '../../config';
import OrderCard from '../components/OrderCard';
import useAuthRedirect from '../components/useAuthRedirect';

const OrderHistory = () => {
  useAuthRedirect();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found.');
        return;
      }

      const res = await fetch(`${BASE_URL}/Orders/${userId}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const ordersArray = [];

      if (data) {
        Object.keys(data).forEach((orderID) => {
          const orderData = data[orderID];
          const itemsArray = [];

          if (orderData.items) {
            Object.values(orderData.items).forEach((item) => {
              itemsArray.push({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              });
            });
          }

          ordersArray.push({
            id: orderData.orderNumber,
            date: `${orderData.orderDate}, ${orderData.orderTime}`,
            items: itemsArray,
            total: orderData.total,
            status: orderData.status,
            deliveryCharges: orderData.deliveryCharges,
          });
        });
      }

      setOrders(ordersArray.reverse());
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex: 1,
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
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3b7cff" style={{marginTop:20}}/>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : orders.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No orders were found.</Text>
      ) : (
        <View style={styles.cardWrapper}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default OrderHistory;
