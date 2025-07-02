import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import AddLabTest from '../screens/AddLabTest';
import AdminDashboard from '../screens/AdminDashboard';
import RemoveLabTest from '../screens/RemoveLabTest';


export default function AdminStack() {
    const Stack = createNativeStackNavigator();

  return (

    <Stack.Navigator initialRouteName="AdminDashboard" screenOptions={{ headerTitle: () => <CustomHeader />, headerBackTitleVisible: false }} >
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{header: () => <CustomHeader showBack={false} />}} />
        <Stack.Screen name="Add" component={AddLabTest} options={{header: () => <CustomHeader showBack={true} />}} />
        <Stack.Screen name="Remove" component={RemoveLabTest} options={{header: () => <CustomHeader showBack={true} />}} />
    </Stack.Navigator>
    
  )
}
