import dayjs from 'dayjs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from '../components/CartContext';
import useAuthRedirect from '../components/useAuthRedirect';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // padding: width * 0.05,

    },

    scrollViewContent: {
        padding: width * 0.05,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.1,
        paddingHorizontal: height * 0.05,
        paddingTop: height * 0.05,
    },
    emptyCartIcon: {
        marginBottom: height * 0.03,
    },
    emptyCartText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#444647',
        marginBottom: height * 0.02,
    },
    startShoppingButton: {
        backgroundColor: '#3b7cff',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
        borderRadius: width * 0.1,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    startShoppingButtonText: {
        color: 'white',
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },

    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: "#f9f9f9",
        borderRadius: width * 0.05,
        padding: width * 0.04,
        marginBottom: width * 0.05,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        alignSelf: 'center',
        width: '100%',
    },
    itemImage: {
        width: width * 0.18,
        height: width * 0.18,
        resizeMode: "contain",
        marginRight: width * 0.04,
    },
    itemNamePriceView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: width * 0.042,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    itemPriceQuantity: {
        color: '#3b7cff',
        fontWeight: 'bold',
        fontSize: width * 0.038,
        marginTop: height * 0.005,
    },
    removeIconContainer: {
        position: 'absolute',
        top: width * 0.02,
        right: width * 0.02,
        padding: width * 0.01,
    },
    dateTimeContainer: {
        backgroundColor: '#3b7cff',
        borderRadius: width * 0.08,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        marginLeft: width * 0.05,
        justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection:'column'
        alignSelf: 'flex-end',
    },
    dateTimeText: {
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: 'bold',
    },

    orderSummaryBox: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        padding: width * 0.04,
        marginTop: width * 0.05, 
        borderRadius: width * 0.05,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        marginBottom: width * 0.05, 
    },
    summaryHeading: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: height * 0.015,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: height * 0.005,
    },
    summaryLabel: {
        fontSize: width * 0.038,
        color: '#475569',
    },
    summaryValue: {
        fontSize: width * 0.038,
        color: '#334155',
    },
    summaryDivider: {
        borderTopWidth: 1,
        borderTopColor: '#CBD5E1',
        marginVertical: height * 0.015,
    },

    
    fixedFooterContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', 
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.03, 
        borderTopLeftRadius: width * 0.08,
        borderTopRightRadius: width * 0.08,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 10,
    },
    totalRow: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.02, 
    },
    totalLabel: {
        fontSize: width * 0.045, 
        fontWeight: 'bold',
        color: '#1E293B',
    },
    totalValue: {
        fontSize: width * 0.045, 
        fontWeight: 'bold',
        color: '#1E293B',
    },
    checkoutButton: {
        backgroundColor: '#3b7cff',
        width: '100%',
        paddingVertical: height * 0.018,
        borderRadius: width * 0.5,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

const CartScreen = ({ route, navigation }) => {
  useAuthRedirect()

    const { cart, removeFromCart, total, subTotal } = useContext(CartContext);

    const applyNavigation = () => {
        navigation.navigate('Checkout');
    };

    const handleRemoveItem = (id, date, time) => {
        removeFromCart(id, date, time);
    };

    // const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const delivery = cart.length > 0 ? 150 : 0;
    // const total = subTotal + delivery;
    
    const fixedFooterHeight = height * 0.18; 

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (

                <View style={styles.emptyCartContainer}>
                    <MaterialCommunityIcons
                        name="cart-off"
                        size={width * 0.3}
                        color="#CBD5E1"
                        style={styles.emptyCartIcon}
                    />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <Pressable
                        style={styles.startShoppingButton}
                        onPress={() => navigation.navigate('HomeTab',{
                          screen:'Home',
                        })}
                    >
                        <Text style={styles.startShoppingButtonText}>Start Booking</Text>
                    </Pressable>
                </View>
            ) : (
              
                <>
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollViewContent,
                            {paddingBottom: fixedFooterHeight + (width * 0.05) }
                        ] }
                        showsVerticalScrollIndicator={false}
                    >
                        {cart.map((labtest) => (
                            <TouchableOpacity
                                key={`${labtest.id}-${labtest.date}-${labtest.time}`}
                                onPress={() => navigation.navigate('HomeTab', {
                                    screen: 'LabTestDetails',
                                    params: { labtest: labtest } 
                                })}
                                style={styles.cartItemContainer}
                            >
                                <Image
                                    style={styles.itemImage}
                                    source={labtest.image}
                                />

                                <View style={styles.itemNamePriceView}>
                                    <Text style={styles.itemName}>{labtest.name}</Text>
                                    <Text style={styles.itemPriceQuantity}>
                                        Rs {labtest.price} x {labtest.quantity}
                                    </Text>
                                </View>

                                <View style={styles.removeIconContainer}>
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={width * 0.05}
                                        color="#EF4444"
                                        onPress={() =>
                                            handleRemoveItem(labtest.id, labtest.date, labtest.time)
                                        }
                                    />
                                </View>

                                <View style={styles.dateTimeContainer}>
                                    <Text style={styles.dateTimeText}>
                                        {dayjs(labtest.date, 'M/D/YY').format('ddd, MMM D')}
                                    </Text>
                                    <Text style={styles.dateTimeText}>{labtest.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

    
                        <View style={styles.orderSummaryBox}>
                            <Text style={styles.summaryHeading}>Order Summary</Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Items</Text>
                                <Text style={styles.summaryValue}>{cart.reduce((total,item)=>(total+item.quantity),0)}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>Rs {subTotal}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Rider charges</Text>
                                <Text style={styles.summaryValue}>Rs {delivery}</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.fixedFooterContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>Rs {total}</Text>
                        </View>

                        <Pressable
                            style={styles.checkoutButton}
                            onPress={applyNavigation}
                        >
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
};

export default CartScreen;



// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import React, { useContext } from "react";
// import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { CartContext } from '../components/CartContext';

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//         // padding: width * 0.05,

//     },

//     scrollViewContent: {
//         padding: width * 0.05,
//     },
//     emptyCartContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingBottom: height * 0.1,
//         paddingHorizontal: height * 0.05,
//         paddingTop: height * 0.05,
//     },
//     emptyCartIcon: {
//         marginBottom: height * 0.03,
//     },
//     emptyCartText: {
//         fontSize: width * 0.05,
//         fontWeight: 'bold',
//         color: 'black',
//         marginBottom: height * 0.02,
//     },
//     startShoppingButton: {
//         backgroundColor: '#3B82F6',
//         paddingVertical: height * 0.015,
//         paddingHorizontal: width * 0.08,
//         borderRadius: width * 0.1,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//     },
//     startShoppingButtonText: {
//         color: 'white',
//         fontSize: width * 0.04,
//         fontWeight: 'bold',
//     },

//     cartItemContainer: {
//         flexDirection: 'row',
//         backgroundColor: "#f9f9f9",
//         borderRadius: width * 0.05,
//         padding: width * 0.04,
//         marginBottom: width * 0.05,
//         elevation: 3,
//         shadowColor: "#000",
//         shadowOpacity: 0.15,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 5,
//         alignSelf: 'center',
//         width: '100%',
//     },
//     itemImage: {
//         width: width * 0.18,
//         height: width * 0.18,
//         resizeMode: "contain",
//         marginRight: width * 0.04,
//     },
//     itemNamePriceView: {
//         flex: 1,
//         justifyContent: 'space-between',
//     },
//     itemName: {
//         fontSize: width * 0.042,
//         fontWeight: 'bold',
//         color: '#1E293B',
//     },
//     itemPriceQuantity: {
//         color: '#3B82F6',
//         fontWeight: 'bold',
//         fontSize: width * 0.038,
//         marginTop: height * 0.005,
//     },
//     removeIconContainer: {
//         position: 'absolute',
//         top: width * 0.02,
//         right: width * 0.02,
//         padding: width * 0.01,
//     },
//     dateTimeContainer: {
//         backgroundColor: '#407CE2',
//         borderRadius: width * 0.08,
//         paddingHorizontal: width * 0.05,
//         paddingVertical: height * 0.01,
//         marginLeft: width * 0.05,
//         justifyContent: 'center',
//         // alignItems: 'center',
//         // flexDirection:'column'
//         alignSelf: 'flex-end',
//     },
//     dateTimeText: {
//         color: 'white',
//         fontSize: width * 0.03,
//         fontWeight: 'bold',
//     },

//     orderSummaryBox: {
//         backgroundColor: '#f9f9f9',
//         width: '100%',
//         padding: width * 0.04,
//         marginTop: width * 0.05, 
//         borderRadius: width * 0.05,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 5,
//         marginBottom: width * 0.05, 
//     },
//     summaryHeading: {
//         fontSize: width * 0.045,
//         fontWeight: 'bold',
//         color: '#1E293B',
//         marginBottom: height * 0.015,
//     },
//     summaryRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginVertical: height * 0.005,
//     },
//     summaryLabel: {
//         fontSize: width * 0.038,
//         color: '#475569',
//     },
//     summaryValue: {
//         fontSize: width * 0.038,
//         color: '#334155',
//     },
//     summaryDivider: {
//         borderTopWidth: 1,
//         borderTopColor: '#CBD5E1',
//         marginVertical: height * 0.015,
//     },

    
//     fixedFooterContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'white', 
//         paddingHorizontal: width * 0.05,
//         paddingTop: height * 0.02,
//         paddingBottom: height * 0.03, 
//         borderTopLeftRadius: width * 0.08,
//         borderTopRightRadius: width * 0.08,
//         elevation: 10,
//         shadowColor: "#000",
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: -5 },
//         shadowRadius: 10,
//     },
//     totalRow: { 
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: height * 0.02, 
//     },
//     totalLabel: {
//         fontSize: width * 0.045, 
//         fontWeight: 'bold',
//         color: '#1E293B',
//     },
//     totalValue: {
//         fontSize: width * 0.045, 
//         fontWeight: 'bold',
//         color: '#1E293B',
//     },
//     checkoutButton: {
//         backgroundColor: '#3B82F6',
//         width: '100%',
//         paddingVertical: height * 0.018,
//         borderRadius: width * 0.5,
//         alignItems: 'center',
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//     },
//     checkoutButtonText: {
//         color: '#FFFFFF',
//         fontSize: width * 0.045,
//         fontWeight: 'bold',
//         letterSpacing: 1,
//     },
// });

// const CartScreen = ({ route, navigation }) => {
//     const { cart, removeFromCart } = useContext(CartContext);

//     const applyNavigation = () => {
//         navigation.navigate('Checkout');
//     };

//     const handleRemoveItem = (id, date, time) => {
//         removeFromCart(id, date, time);
//     };

//     const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     const delivery = cart.length > 0 ? 150 : 0;
//     const total = subTotal + delivery;
    
//     const fixedFooterHeight = height * 0.18; 

//     const labtestTemp = 
//     {
//       id:1,
//       name: "Hb",
//       price: 100,
//       description: "Custom logo design with 3 initial concepts",
//       sampleRequired: "Client must provide design inspiration or references",
//       turnaroundTime: "3 days",
//       gender: "This test is for both genders",
//       image: "https://https://www.istockphoto.com/vector/drop-gm1081786788-290097354.com/images/logo-design.png"
//     }

//     return (
//         <View style={styles.container}>
//             {cart.length === 0 ? (

//                 <View style={styles.emptyCartContainer}>
//                     <MaterialCommunityIcons
//                         name="cart-off"
//                         size={width * 0.3}
//                         color="#CBD5E1"
//                         style={styles.emptyCartIcon}
//                     />
//                     <Text style={styles.emptyCartText}>Your cart is empty</Text>
//                     <Pressable
//                         style={styles.startShoppingButton}
//                         onPress={() => navigation.navigate('HomeTab',{
//                           screen:'Home',
//                         })}
//                     >
//                         <Text style={styles.startShoppingButtonText}>Start Booking</Text>
//                     </Pressable>
//                 </View>
//             ) : (
              
//                 <>
//                     <ScrollView
//                         contentContainerStyle={[
//                             styles.scrollViewContent,
//                             {paddingBottom: fixedFooterHeight + (width * 0.05) }
//                         ] }
//                         showsVerticalScrollIndicator={false}
//                     >
//                         {cart.map((labTest) => (
//                             <TouchableOpacity
//                                 key={`${labTest.id}-${labTest.date}-${labTest.time}`}
//                                 onPress={() => navigation.navigate('HomeTab', {
//                                     screen: 'LabTestDetails',
//                                     params: labtestTemp 
//                                 })}
//                                 style={styles.cartItemContainer}
//                             >
//                                 <Image
//                                     style={styles.itemImage}
//                                     source={require('../../assets/images/bloodTestCategoryImg.png')}
//                                 />

//                                 <View style={styles.itemNamePriceView}>
//                                     <Text style={styles.itemName}>{labTest.name}</Text>
//                                     <Text style={styles.itemPriceQuantity}>
//                                         Rs {labTest.price} x {labTest.quantity}
//                                     </Text>
//                                 </View>

//                                 <View style={styles.removeIconContainer}>
//                                     <MaterialCommunityIcons
//                                         name="trash-can-outline"
//                                         size={width * 0.05}
//                                         color="#EF4444"
//                                         onPress={() =>
//                                             handleRemoveItem(labTest.id, labTest.date, labTest.time)
//                                         }
//                                     />
//                                 </View>

//                                 <View style={styles.dateTimeContainer}>
//                                     <Text style={styles.dateTimeText}>
//                                         {new Date(labTest.date).toLocaleDateString('en-US', {
//                                         weekday: 'short',
//                                         month: 'short',
//                                         day: 'numeric',})}
//                                     </Text>
//                                     <Text style={styles.dateTimeText}>{labTest.time}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         ))}

    
//                         <View style={styles.orderSummaryBox}>
//                             <Text style={styles.summaryHeading}>Order Summary</Text>

//                             <View style={styles.summaryRow}>
//                                 <Text style={styles.summaryLabel}>Items</Text>
//                                 <Text style={styles.summaryValue}>{cart.reduce((total,item)=>(total+item.quantity),0)}</Text>
//                             </View>

//                             <View style={styles.summaryRow}>
//                                 <Text style={styles.summaryLabel}>Subtotal</Text>
//                                 <Text style={styles.summaryValue}>Rs {subTotal}</Text>
//                             </View>

//                             <View style={styles.summaryRow}>
//                                 <Text style={styles.summaryLabel}>Delivery charges</Text>
//                                 <Text style={styles.summaryValue}>Rs {delivery}</Text>
//                             </View>
//                         </View>
//                     </ScrollView>

//                     <View style={styles.fixedFooterContainer}>
//                         <View style={styles.totalRow}>
//                             <Text style={styles.totalLabel}>Total</Text>
//                             <Text style={styles.totalValue}>Rs {total}</Text>
//                         </View>

//                         <Pressable
//                             style={styles.checkoutButton}
//                             onPress={applyNavigation}
//                         >
//                             <Text style={styles.checkoutButtonText}>Checkout</Text>
//                         </Pressable>
//                     </View>
//                 </>
//             )}
//         </View>
//     );
// };

// export default CartScreen;