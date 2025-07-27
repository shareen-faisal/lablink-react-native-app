// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createContext, useCallback, useEffect, useState } from 'react';
// import Toast from 'react-native-toast-message';
// import { BASE_URL } from '../../config';

// export const CartContext = createContext()

// export default function CartProvider({children }) {
//     const [cart,setCart] = useState([]);
//     const [total,setTotal] = useState(0)
//     const [subTotal,setSubTotal] = useState(0);
//     const [isCartLoaded, setIsCartLoaded] = useState(false);
//     const [currentUserId, setCurrentUserId] = useState(null);
//     const [currentUserToken, setCurrentUserToken] = useState(null);

//     useEffect(() => {
//       const fetchAuthTokens = async () => {
//         const userId = await AsyncStorage.getItem('userId');
//         const userToken = await AsyncStorage.getItem('userToken');
//         setCurrentUserId(userId);
//         setCurrentUserToken(userToken);
//       };

//       fetchAuthTokens();
//     }, []);

//     // const loadCartFromDB = async () => {
//     //   try {
//     //     const userId = await AsyncStorage.getItem('userId');
//     //     const userToken = await AsyncStorage.getItem('userToken');

//     //     if (!userId || !userToken) {
//     //       console.warn('loadCartFromDB: User not logged in or token missing. Cannot load cart.');
//     //       setCart([]); 
//     //       setIsCartLoaded(true); 
//     //       return;
//     //     }

//     //     const response = await fetch(`${BASE_URL}/cart/${userId}.json?auth=${userToken}`);
        
//     //     if (!response.ok) {
//     //       console.error(`Failed to fetch cart.`);
//     //       setCart([]);
//     //       setIsCartLoaded(true);
//     //       return;
//     //     }

//     //     const data = await response.json();
//     //     console.log('loadCartFromDB: Fetched data:', data);

//     //     const loadedCart = (data ? Object.values(data) : []).map(item => ({
//     //         ...item,
//     //         // date: new Date(item.date), 
//     //         date: item.date,
//     //     }));
        
//     //     setCart(loadedCart);
//     //     console.log('loadCartFromDB: Cart loaded successfully:', loadedCart);
//     //   } catch (error) {
//     //     console.error('loadCartFromDB: Error loading cart from DB:', error);
//     //     Toast.show({
//     //       type: 'error',
//     //       text1: 'Failed to load your cart.',
//     //       text2: 'Please check your internet connection.',
//     //     });
//     //     setCart([]);
//     //   } finally {
//     //     setIsCartLoaded(true); 
//     //   }
//     // };

//     const loadCartFromDB = useCallback(async () => {
//       console.log('loadCartFromDB: Attempting to load cart from DB.');
//       try {
//         if (!currentUserId || !currentUserToken) {
//           console.warn('loadCartFromDB: User not logged in or token missing. Cannot load cart.');
//           setCart([]);
//           setIsCartLoaded(true);
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/cart/${currentUserId}.json?auth=${currentUserToken}`);
        
//         if (!response.ok) {
//           console.error(`Failed to fetch cart`);
//           setCart([]);
//           setIsCartLoaded(true);
//           return;
//         }

//         const data = await response.json();
//         console.log('loadCartFromDB: Fetched data:', data);

//         const loadedCart = (data ? Object.values(data) : []).map(item => ({
//             ...item,
//             // date: new Date(item.date), 
//             date : item.date,
//         }));
        
//         setCart(loadedCart);
//         console.log('loadCartFromDB: Cart loaded successfully:', loadedCart);
//       } catch (error) {
//         console.error('loadCartFromDB: Error loading cart from DB:', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to load your cart.',
//           text2: 'Please check your internet connection.',
//         });
//         setCart([]); 
//       } finally {
//         setIsCartLoaded(true);
//       }
//     }, [currentUserId, currentUserToken]);

//     const storeCartinDB = async ()=>{
//       if (!isCartLoaded) {
//         console.log('storeCartinDB: Cart not yet loaded, skipping save.');
//         return;
//       }
//       try{
//         if (!currentUserId || !currentUserToken) { // Use current state values
//           console.warn('User not logged in or token missing. Cart will not be stored in DB.');
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/cart/${currentUserId}.json?auth=${currentUserToken}`,{
//           method:'PUT',
//           headers:{
//             'Content-Type': 'application/json' 
//           },
//           body:JSON.stringify(cart)
//         })

//         if (!response.ok) {
//           throw new Error(`Failed to save cart.`);
//         }
    
//         console.log('Cart stored successfully');
//       }catch(error){
//         console.error('Error saving cart:', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to save cart.',
//           text2: 'Please check your internet connection or try again later.',
//         });
//       }
//     }

//     useEffect(() => {
//       loadCartFromDB();
//   }, [loadCartFromDB]);

//     useEffect(()=>{
//       if (isCartLoaded) {
//         storeCartinDB();
//       }
//     },[cart,isCartLoaded,storeCartinDB])
    
//     const addToCart=(item)=>{
//         setCart((p)=>{
//             // const isPressent = p.findIndex((temp)=>(temp.name===item.name && temp.date.getDate()===item.date.getDate() && temp.date.getMonth()===item.date.getMonth() && temp.time===item.time));
//             const isPressent = p.findIndex((temp) => (
//               temp.name === item.name && 
//               temp.date === item.date && 
//               temp.time === item.time
//             ));
//             if(isPressent!==-1){
//                 const updated = [...p];
//                 updated[isPressent]={...updated[isPressent], quantity: updated[isPressent].quantity+item.quantity};
//                 return updated;
//             }else{

//                 return [...p,{...item}]

//             }
//         })
//     }

//     const removeFromCart = (id, date, time) => {
//         setCart((prevCart) =>
//           prevCart.filter(
//             (item) => !(item.id === id && item.date === date && item.time === time)
//           )
//         );
//       };

//       const clearCart = ()=>{
//         setCart([]);
//       }

      
//   const getTotalItems = () => {
//     return cart.reduce((sum, item) => sum + item.quantity, 0);
//   };

//     useEffect(() => {
//     const newSubTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const deliveryCharges = cart.length > 0 ? 150 : 0;
//     setSubTotal(newSubTotal);
//     setTotal(newSubTotal + deliveryCharges);
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems,clearCart,total,subTotal,setCart }}>
//     {children}
//   </CartContext.Provider>
    
//   )
// }

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createContext, useCallback, useEffect, useState } from 'react';
// import Toast from 'react-native-toast-message';
// import { BASE_URL } from '../../config';


// export const CartContext = createContext()



// export default function CartProvider({children }) {
//     const [cart,setCart] = useState([]);
//     const [total,setTotal] = useState(0)
//     const [subTotal,setSubTotal] = useState(0);
//     const [isCartLoaded, setIsCartLoaded] = useState(false);
//     // Removed currentUserId and currentUserToken state variables

//     // Function to load cart from DB, memoized with useCallback
//     const loadCartFromDB = useCallback(async () => {
//       console.log('loadCartFromDB: Attempting to load cart from DB.');
//       try {
//         // Fetch userId and userToken directly here
//         const userId = await AsyncStorage.getItem('userId');
//         const userToken = await AsyncStorage.getItem('userToken');

//         console.log('loadCartFromDB: Fetched auth tokens - userId:', userId, 'token presence:', !!userToken);

//         if (!userId || !userToken) {
//           console.warn('loadCartFromDB: User not logged in or token missing. Cannot load cart.');
//           setCart([]); // Ensure cart is empty if no user is logged in
//           setIsCartLoaded(true); // Mark as loaded even if empty, to prevent saving empty cart
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/cart/${userId}.json?auth=${userToken}`);
        
//         if (!response.ok) {
//           console.error(`loadCartFromDB: Failed to fetch cart: ${response.status} ${response.statusText}`);
//           setCart([]);
//           setIsCartLoaded(true);
//           return;
//         }

//         const data = await response.json();
//         console.log('loadCartFromDB: Fetched data:', data);

//         // Date is a string, so no conversion needed as per user's instruction
//         const loadedCart = (data ? Object.values(data) : []).map(item => ({
//             ...item,
//             date: item.date, // Keep date as string
//         }));
        
//         setCart(loadedCart);
//         console.log('loadCartFromDB: Cart loaded successfully:', loadedCart);
//       } catch (error) {
//         console.error('loadCartFromDB: Error loading cart from DB:', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to load your cart.',
//           text2: 'Please check your internet connection.',
//         });
//         setCart([]); // Ensure cart is empty on error
//       } finally {
//         setIsCartLoaded(true); // Always mark as loaded, regardless of success or failure
//       }
//     }, []); // No dependencies related to userId/userToken state, as they are fetched internally

//     // Function to store cart to DB whenever it changes (after initial load)
//     const storeCartinDB = async ()=>{
//       console.log('storeCartinDB: Called. isCartLoaded:', isCartLoaded);
//       if (!isCartLoaded) {
//         console.log('storeCartinDB: Cart not yet loaded, skipping save.');
//         return;
//       }
//       try{
//         // Fetch userId and userToken directly here
//         const userId = await AsyncStorage.getItem('userId');
//         const userToken = await AsyncStorage.getItem('userToken');

//         console.log('storeCartinDB: Fetched auth tokens for save - userId:', userId, 'token presence:', !!userToken);

//         if (!userId || !userToken) {
//           console.warn('storeCartinDB: User not logged in or token missing. Cart will not be stored in DB.');
//           return;
//         }

//         // Date is a string, so no conversion needed as per user's instruction
//         const cartToStore = cart.map(item => ({
//             ...item,
//             date: item.date, // Send date as string
//         }));

//         console.log('storeCartinDB: Cart data being sent:', JSON.stringify(cartToStore));
//         console.log(`storeCartinDB: Saving to URL: ${BASE_URL}/cart/${userId}.json?auth=${userToken}`);

//         const response = await fetch(`${BASE_URL}/cart/${userId}.json?auth=${userToken}`,{
//           method:'PUT',
//           headers:{
//             'Content-Type': 'application/json' 
//           },
//           body:JSON.stringify(cartToStore) // Use the mapped cartToStore here
//         })

//         if (!response.ok) {
//           const errorData = await response.json(); // Try to get more detailed error from Firebase
//           throw new Error(`Failed to store cart in DB: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
//         }
    
//         console.log('Cart stored successfully in DB.');
//       }catch(error){
//         console.error('Error saving cart to DB:', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to save cart.',
//           text2: error.message || 'Please check your internet connection or try again later.',
//         });
//       }
//     }

//     // Effect to load cart when component mounts (and implicitly when auth tokens become available)
//     useEffect(() => {
//         loadCartFromDB();
//     }, [loadCartFromDB]); // Dependency array for useEffect

//     // Effect to store cart when it changes, but only after initial load
//     useEffect(()=>{
//         if (isCartLoaded) {
//             storeCartinDB();
//         }
//     },[cart, isCartLoaded, storeCartinDB]) // Add storeCartinDB to dependencies as it's a useCallback

//     const addToCart=(item)=>{
//         setCart((p)=>{
//             // Compare dates as strings directly
//             const isPressent = p.findIndex((temp)=>(
//                 temp.name===item.name && 
//                 temp.date === item.date && // Compare dates as strings
//                 temp.time===item.time
//             ));
//             if(isPressent!==-1){
//                 const updated = [...p];
//                 updated[isPressent]={...updated[isPressent], quantity: updated[isPressent].quantity+item.quantity};
//                 return updated;
//             }else{
//                 return [...p,{...item}] // Add item as is, date is already a string
//             }
//         })
//     }

//     const removeFromCart = (id, date, time) => {
//         setCart((prevCart) =>
//           prevCart.filter(
//             // Compare dates as strings directly
//             (item) => !(item.id === id && item.date === date && item.time === time)
//           )
//         );
//       };

//     const clearCart = ()=>{
//         setCart([]);
//     }

      
//   const getTotalItems = () => {
//     return cart.reduce((sum, item) => sum + item.quantity, 0);
//   };

//     useEffect(() => {
//     const newSubTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const deliveryCharges = cart.length > 0 ? 150 : 0;
//     setSubTotal(newSubTotal);
//     setTotal(newSubTotal + deliveryCharges);
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems,clearCart,total,subTotal,setCart }}>
//     {children}
//   </CartContext.Provider>
    
//   )
// }


import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../config';


export const CartContext = createContext()



export default function CartProvider({children }) {
    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0)
    const [subTotal,setSubTotal] = useState(0);
    const [isCartLoaded, setIsCartLoaded] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUserToken, setCurrentUserToken] = useState(null);

    const fetchAuthTokens = useCallback(async () => {
      console.log('CartProvider: Attempting to fetch auth tokens from AsyncStorage.');
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
      setCurrentUserId(userId);
      setCurrentUserToken(userToken);
      console.log('CartProvider: Fetched auth tokens - userId:', userId, 'token presence:', !!userToken);
    }, []); 

    useEffect(() => {
      fetchAuthTokens();
    }, [fetchAuthTokens]);

    const loadCartFromDB = useCallback(async () => {
      console.log('loadCartFromDB: Called. currentUserId:', currentUserId, 'currentUserToken presence:', !!currentUserToken);
      try {
        if (!currentUserId || !currentUserToken) {
          console.warn('loadCartFromDB: User not logged in or token missing. Cannot load cart.');
          setCart([]); 
          setIsCartLoaded(true); 
          return;
        }

        const response = await fetch(`${BASE_URL}/cart/${currentUserId}.json?auth=${currentUserToken}`);
        
        if (!response.ok) {
          console.error(`loadCartFromDB: Failed to fetch cart: ${response.status} ${response.statusText}`);
          setCart([]);
          setIsCartLoaded(true);
          return;
        }

        const data = await response.json();
        console.log('loadCartFromDB: Fetched data:', data);

        const loadedCart = (data ? Object.values(data) : []).map(item => ({
            ...item,
            date: item.date, 
        }));
        
        setCart(loadedCart);
        console.log('loadCartFromDB: Cart loaded successfully:', loadedCart);

      } catch (error) {
        console.error('loadCartFromDB: Error loading cart from DB:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to load your cart.',
          text2: 'Please check your internet connection.',
        });
        setCart([]); 
      } finally {
        setIsCartLoaded(true); 
      }
    }, [currentUserId, currentUserToken]); 

    const storeCartinDB = useCallback(async ()=>{ 
      console.log('storeCartinDB: Called. isCartLoaded:', isCartLoaded);
      if (!isCartLoaded) {
        console.log('storeCartinDB: Cart not yet loaded, skipping save.');
        return;
      }
      try{
        if (!currentUserId || !currentUserToken) {
          console.warn('storeCartinDB: User not logged in or token missing. Cart will not be stored in DB.');
          return;
        }

        // console.log('storeCartinDB: Cart data being sent:', JSON.stringify(cart));
        // console.log(`storeCartinDB: Saving to URL: ${BASE_URL}/cart/${currentUserId}.json?auth=${currentUserToken}`);

        const response = await fetch(`${BASE_URL}/cart/${currentUserId}.json?auth=${currentUserToken}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json' 
          },
          body:JSON.stringify(cart) 
        })

        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error(`Failed to store cart in DB: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
        }
    
        console.log('Cart stored successfully in DB.');
      }catch(error){
        console.error('Error saving cart to DB:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to save cart.',
          text2: error.message || 'Please check your internet connection or try again later.',
        });
      }
    }, [cart, currentUserId, currentUserToken, isCartLoaded]); 

    useEffect(() => {
        setIsCartLoaded(false); 
        loadCartFromDB();
    }, [currentUserId, currentUserToken, loadCartFromDB]); 

    useEffect(()=>{
        if (isCartLoaded) {
            storeCartinDB();
        }
    },[cart, isCartLoaded, storeCartinDB])
    
    const addToCart=(item)=>{
        setCart((p)=>{
            const isPressent = p.findIndex((temp)=>(
                temp.name===item.name && 
                temp.date === item.date && 
                temp.time===item.time
            ));
            if(isPressent!==-1){
                const updated = [...p];
                updated[isPressent]={...updated[isPressent], quantity: updated[isPressent].quantity+item.quantity};
                return updated;
            }else{
                return [...p,{...item}] 
            }
        })
    }

    const removeFromCart = (id, date, time) => {
        setCart((prevCart) =>
          prevCart.filter(
            (item) => !(item.id === id && item.date === date && item.time === time)
          )
        );
      };

    const clearCart = ()=>{
        setCart([]);
    }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

    useEffect(() => {
    const newSubTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharges = cart.length > 0 ? 150 : 0;
    setSubTotal(newSubTotal);
    setTotal(newSubTotal + deliveryCharges);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems,clearCart,total,subTotal,setCart, fetchAuthTokens }}>
    {children}
  </CartContext.Provider>
    
  )
}