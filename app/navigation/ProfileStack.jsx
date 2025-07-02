import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import ChangePassword from '../screens/ChangePassword';
import ProfileView from '../screens/EditProfile';
import Profile from '../screens/Profile';




const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{header: ()=>(<CustomHeader showBack={true} />)}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="Password" component={ChangePassword} />
    </Stack.Navigator>
  );
}
