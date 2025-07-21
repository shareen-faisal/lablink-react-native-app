import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
export default function useAuthRedirect() {
  const navigation = useNavigation();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
}
