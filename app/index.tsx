import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CartProvider from '../app/components/CartContext';
import RootNavigator from '../app/navigation/RootNavigator';
import CustomToast from './components/CustomToast';
export default function App() {
  // useEffect(() => {
  //   document.title = "LabLink - Book. Test. Relax."; // ← your custom title
  // }, []);


  
  
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <CartProvider>

          <RootNavigator/>

          <Toast
            config={{
              success: (props) => <CustomToast {...props} />,
              error: (props) => <CustomToast {...props} />,
            }}
          />

      </CartProvider>


        
      {/* </NavigationContainer> */}
      
    </SafeAreaProvider>
  );
}


 

