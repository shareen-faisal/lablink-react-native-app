import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LabTestDetailScreen from '../screens/LabTestDetailScreen';
import OrderSummary from '../screens/OrderSummary';
import SearchResultsScreen from '../screens/SearchResultsScreen';

export default function HomeStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator  initialRouteName="Home" screenOptions={{ headerTitle: () => <CustomHeader />, headerBackTitleVisible: false }}>
        <Stack.Screen name='Home' component={HomeScreen} options={{header: () => <CustomHeader showBack={false} />}}  />
        <Stack.Screen name='Search' component={SearchResultsScreen} options={{header: () => <CustomHeader showBack={true} />}}   />
        <Stack.Screen  name='Category' component={CategoryScreen} options={{header: ()=>(<CustomHeader showBack={true} />)}} />
        <Stack.Screen name='LabTestDetails' component={LabTestDetailScreen} options={{header: ()=>(<CustomHeader showBack={true} />)}}  />
        <Stack.Screen name='OrderSummary' component={OrderSummary} />

    </Stack.Navigator>
  )
}
