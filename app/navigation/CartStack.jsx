import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';


const CartStack = () => {

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName='Cart' screenOptions={{header: ()=>(<CustomHeader showBack={true} />)}} >
            <Stack.Screen name='Cart' component={CartScreen}  />
            <Stack.Screen name='Checkout' component={CheckoutScreen}  />
            {/* <Stack.Screen name='OrderSummary' component={OrderSummary} /> */}
        </Stack.Navigator>
    )
}

export default CartStack
