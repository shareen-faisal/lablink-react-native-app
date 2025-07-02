import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';


const CartStack = () => {

    const Stack = createNativeStackNavigator();

    const labTestInfo = [
        {
          id: 1,
          name: "Hb",
          price: 100,
          description: "Custom logo design with 3 initial concepts",
          sampleRequired: "Client must provide design inspiration or references",
          turnaroundTime: "3 days",
          gender: "This test is for both genders",
          image: "https://www.istockphoto.com/vector/drop-gm1081786788-290097354" // Fixed
        },
        {
          id: 2,
          name: "Blood Sugar",
          price: 150,
          description: "Checks fasting blood sugar level for diabetes diagnosis",
          sampleRequired: "Fasting blood sample required",
          turnaroundTime: "1 day",
          gender: "Applicable to all genders",
          image: "https://www.istockphoto.com/vector/medical-icon-blood-sugar-gm1281162255-376065422" // Example placeholder
        },
      
        { id: 3,
          name: "Blood Sugar",
          price: 150,
          description: "Checks fasting blood sugar level for diabetes diagnosis",
          sampleRequired: "Fasting blood sample required",
          turnaroundTime: "1 day",
          gender: "Applicable to all genders",
          image: "https://www.istockphoto.com/vector/medical-icon-blood-sugar-gm1281162255-376065422" // Example placeholder
        },
      
      
      ];

    return(
        <Stack.Navigator initialRouteName='Cart' screenOptions={{header: ()=>(<CustomHeader showBack={true} />)}} >
            <Stack.Screen name='Cart' component={CartScreen}  initialParams={{ labTestInfo}}  />
            <Stack.Screen name='Checkout' component={CheckoutScreen}  />
            {/* <Stack.Screen name='OrderSummary' component={OrderSummary} /> */}
        </Stack.Navigator>
    )
}

export default CartStack
