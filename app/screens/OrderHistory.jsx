import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

dayjs.extend(customParseFormat);

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
  const [filter, setFilter] = useState('all'); // all | completed | pending

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
        await Promise.all(
          Object.keys(data).map(async (orderID) => {
            const orderData = data[orderID];
            const itemsArray = [];

            let allItemsPassed = true;
            if (orderData.items) {
              Object.values(orderData.items).forEach((item) => {
                itemsArray.push({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  date: item.date,
                  time: item.time,
                });

                const itemDate = dayjs(item.date, 'M/D/YY');
                const itemTime = dayjs(item.time, 'hh:mm A');
                const now = dayjs();

                const itemDateTime = itemDate
                  .hour(itemTime.hour())
                  .minute(itemTime.minute());

                if (itemDateTime.isValid() && itemDateTime.isAfter(now)) {
                  allItemsPassed = false;
                }
              });
            }

            if (orderData.status === 'pending' && allItemsPassed) {
              await fetch(`${BASE_URL}/Orders/${userId}/${orderID}.json`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'completed' }),
              });
              orderData.status = 'completed';
            }

            ordersArray.push({
              id: orderData.orderNumber,
              date: `${orderData.orderDate}, ${orderData.orderTime}`,
              items: itemsArray,
              total: orderData.total,
              status: orderData.status,
              deliveryCharges: orderData.deliveryCharges,
              orderNumber: orderData.orderNumber, // for sorting
            });
          })
        );
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

  const filteredOrders = orders.filter((order) =>
    filter === 'all' ? true : order.status === filter
  );

  const styles = StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: '#fff',
      flex: 1,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111',
      marginTop: 8,
      marginBottom: 0,
      textAlign: 'center',
    },
    cardWrapper: {
      marginTop: 20,
      paddingBottom: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 18,
      marginBottom: 8,
    },
    filterButton: {
      marginHorizontal: 8,
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#3b7cff',
      color: '#3b7cff',
      fontWeight: '600',
      fontSize: 13,
    },
    activeFilter: {
      backgroundColor: '#3b7cff',
      color: '#fff',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Booking History</Text>

      <View style={styles.filterContainer}>
        {['all', 'pending', 'completed'].map((type) => (
          <Text
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}
            onPress={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b7cff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredOrders.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No {filter} bookings found.</Text>
      ) : (
        <View style={styles.cardWrapper}>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default OrderHistory;
