import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../components/CartContext';
import OrderSummary from './OrderSummary';
import { BASE_URL } from '../../config';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: width * 0.05,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    alignSelf: 'center',
    // marginBottom: height * 0.01,
  },
  subHeadings: {
    fontWeight: 'bold',
    fontSize: width * 0.042,
    marginTop: height * 0.02,
  },
  inputGroup: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: height * 0.015,
    gap: 8,
  },
  label: {
    fontSize: width * 0.038,
    color: '#334155',
  },
  inputField: {
    backgroundColor: '#F8F7F7',
    borderRadius: width * 0.03,
    padding: width * 0.045,
    marginTop: height * 0.01,
  },
  pickerBox: {
    backgroundColor: '#F8F7F7',
    borderRadius: width * 0.03,
    marginTop: height * 0.01,
    justifyContent: 'center',
  },
  picker: {
    height: height * 0.07,
    width: '100%',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.015,
    gap: 8,
  },
  paymentText: {
    fontSize: width * 0.04,
    color: '#334155',
  },
  summaryBox: {
    backgroundColor: '#F8F7F7',
    borderRadius: 12,
    padding: width * 0.04,
    marginTop: height * 0.03,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: height * 0.015,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.005,
  },
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginVertical: height * 0.015,
  },
  totalText: {
    fontWeight: 'bold',
  },
 confirmButton: {
    backgroundColor: '#3B82F6', 
    width: '100%',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.1,
    borderRadius: width * 0.5, 
    alignItems: 'center',
    marginTop: height * 0.04,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: width * 0.02,
    shadowOffset: { width: width * 0, height: width * 0.02 },
    shadowRadius: width * 0.02,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        letterSpacing: 1,
    }, 
});


const CheckoutScreen = ({navigation}) => {

  const [latestOrder, setLatestOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [street, setStreet] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const {clearCart, total, subTotal, cart} = useContext(CartContext)

  const cities = ['Gujranwala','Karachi', 'Lahore', 'Islamabad'];

    const handleSubmit = async () => {

      if(!street && !selectedCity){
        Toast.show({
          type: 'error',
          text1: 'Please fill street address and city'
        })
        return;
      }

      if(!street){
        Toast.show({
          type: 'error',
          text1: 'Street address is required'
        })
        return;
      }

      if(!selectedCity){
        Toast.show({
          type: 'error',
          text1: 'Please select a city'
        })
        return;
      }


      const res = await fetch(`${BASE_URL}/Orders.json`);
      const orders = await res.json();

      const existingOrderCount = orders ? Object.keys(orders).length : 0;
      const newOrderNumber = 100 + existingOrderCount;

      const order = {
        orderNumber : newOrderNumber,
        address: street,
        city : selectedCity,
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          date: item.date.toLocaleDateString(),
          time: item.time,
        })),
          subtotal: subTotal,
          deliveryCharges: 150,
          total: total,
          status: 'pending',
      }

      const response = await fetch(`${BASE_URL}/Orders.json`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if(response.ok){
        setLatestOrder(order)
        setModalVisible(true)
        setSelectedCity('');
        setStreet('');
        clearCart();
      }else{
        Toast.show({
          type: 'error',
          text1: 'Failed to place order',
        });
      }

    }//
    

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Checkout</Text>

           
            <Text style={styles.subHeadings}>Checkout Details</Text>

           
            <View style={styles.inputGroup}>
                <Icon name="location-outline" size={18} color="#407CE2" />
                <Text style={styles.label}>Street Address</Text>
            </View>
            <TextInput placeholder="Enter street address" style={styles.inputField} value={street} onChangeText={setStreet}  />

            
            <View style={styles.inputGroup}>
                <Icon name="home-outline" size={18} color="#407CE2" />
                <Text style={styles.label}>City</Text>
            </View>

            <View style={styles.pickerBox}>

                <Picker  selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)} style={styles.picker}  >
                <Picker.Item label="Select City" value="" enabled={false} color="#9CA3AF" />
                {cities.map((city, index) => (
                    <Picker.Item key={index} label={city} value={city}   color="#000000" />
                ))}
                </Picker>
            </View>

            
            <Text style={styles.subHeadings}>Payment method</Text>
            <View style={styles.paymentOption}>
                <Icon name="cash-outline" size={20} color="#facc15" />
                <Text style={styles.paymentText}>Cash on Delivery</Text>
            </View>

            <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Order Summary</Text>

                <View style={styles.summaryContent}>
                    <Text>Items</Text>
                    <Text>{cart.length}</Text>
                </View>

                <View style={styles.summaryContent}>
                    <Text>Subtotal</Text>
                    <Text>Rs {subTotal}</Text>
                </View>

                <View style={styles.summaryContent}>
                    <Text>Delivery charges</Text>
                    <Text>Rs 150</Text>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryContent}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>Rs {total}</Text>
                </View>
            </View>

            {/* Confirm Order Button */}
            <Pressable style={styles.confirmButton} onPress={handleSubmit} >
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </Pressable>

            <OrderSummary visible={modalVisible} onClose={()=>setModalVisible(false)} navigation={navigation} order={latestOrder} />
    </ScrollView>

    )
}

export default CheckoutScreen