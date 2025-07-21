import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminStack from '../navigation/AdminStack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import Customer_Login from '../screens/Login';
import Customer_Signup from '../screens/Signup';
import WelcomeScreen from '../screens/WelcomeScreen';
import Customer_ForgetPassword from '../screens/ForgetPassword';






export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
  return (

    <Stack.Navigator  initialRouteName="Welcome" screenOptions={{headerShown:false}} >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Customer_Login} />
        <Stack.Screen name="Signup" component={Customer_Signup} />
        <Stack.Screen name="Forget Password" component={Customer_ForgetPassword} />
        <Stack.Screen name='BottomTab' component={BottomTabNavigator}   />
        <Stack.Screen name='AdminStack' component={AdminStack} />
    </Stack.Navigator>
    
  )
}
