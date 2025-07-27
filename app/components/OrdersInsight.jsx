import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OrdersInsight() {

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  useEffect(()=> {
    handleOrderNumber();
  }, [totalOrders, pendingOrders, completedOrders]);

  const handleOrderNumber =async () => {
    try{
      let total = 0;
      let pending = 0;
      let completed = 0;

      const orders = await fetch('https://lablink-trial-default-rtdb.firebaseio.com/Orders.json');
      const data = await orders.json();
      for(const userId in data){
        const userOrders = data[userId];
        for(const orderId in userOrders){
          total += 1;
          if(userOrders[orderId].status === 'pending'){
            pending +=1;
          }else{
            completed +=1;
          }
        
        }
      }
      setTotalOrders(total);
      setPendingOrders(pending);
      setCompletedOrders(completed);
     
  } catch (error) {
    console.error('Error fetching order numbers:', error);
    Toast.show({ type: 'error', text1: 'Failed to load order stats' });
    }

  } 

 


  return (

    <View style={styles.statsRow}>

    <View style={styles.statBox}>
      <Text style={styles.statLabel}>Total Orders</Text>
      <View style={styles.circle}>
        <Text style={styles.statCount}>{totalOrders}</Text>
      </View>
    </View>
  
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>Pending</Text>
      <View style={styles.circle}>
        <Text style={styles.statCount}>{pendingOrders}</Text>
      </View>
    </View>
  
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>Completed</Text>
      <View style={styles.circle}>
        <Text style={styles.statCount}>{completedOrders}</Text>
      </View>
    </View>
  
  </View>
  

  )
}

const styles = StyleSheet.create({
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
      marginTop:5,
    },
    statBox: {
      flex: 1,
      backgroundColor: 'white',
      marginHorizontal: 5,
      paddingVertical: 20,
      borderRadius: 12,
      alignItems: 'center',
      elevation: 2,
      borderWidth: 1.5,    
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    statLabel: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 5,
      color: '#000',
    },
    statCount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#3b7cff',
    },
    circle: {
      width: 32,
      height: 32,
      borderRadius: 25,
      backgroundColor: '#e6f0ff',
      borderColor: '#3b7cff',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
    
  });
