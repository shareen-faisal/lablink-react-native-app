import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import OrderHistory from '../screens/OrderHistory';

export default function OrdersStack() {
    const Stack = createNativeStackNavigator();
  return (

    <Stack.Navigator screenOptions={{header: ()=>(<CustomHeader showBack={true} />)}} >
        <Stack.Screen name='OrderHistory' component={OrderHistory} />
    </Stack.Navigator>
    
  )
}
