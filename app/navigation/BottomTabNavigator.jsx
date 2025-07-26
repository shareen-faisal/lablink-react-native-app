import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartContext } from '../components/CartContext';
import CartStack from '../navigation/CartStack';
import HomeStack from '../navigation/HomeStack';
import OrdersStack from '../navigation/OrdersStack';
import ProfileStack from '../navigation/ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ()=>{
    const insets = useSafeAreaInsets();
    const {width,height} = useWindowDimensions();
    const { getTotalItems } = useContext(CartContext);
    const itemCount = getTotalItems();
    const styles = StyleSheet.create({
        iconContainer: {
          position: 'relative',
        },
        badgeContainer: {
          position: 'absolute',
          top: -4,
          right: -10,
          backgroundColor: '#407CE2',
          borderRadius: 12,
          paddingHorizontal: 6,
          paddingVertical: 1,
          minWidth: 18,
          alignItems: 'center',
          justifyContent: 'center',
        },
        badgeText: {
          color: 'white',
          fontSize: 10,
          fontWeight: 'bold',
        },
      });

      
    return(
        <Tab.Navigator

            screenOptions={({route})=>{
                return {
                    headerShown:false,
                    tabBarShowLabel:true,
                    tabBarLabelStyle: {fontSize: width * 0.03,fontWeight: '600',marginTop: 3},
                    tabBarIcon: ({focused,color,size})=>{
                        let iconName;
                        let Icon=Ionicons;

                        if(route.name==='HomeTab'){
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'CartTab') {
                            iconName = focused ? 'cart' : 'cart-outline';
                            return (
                                <View style={styles.iconContainer}>
                                  <Icon name={iconName} size={width * 0.055} color={color} />
                                  {route.name === 'CartTab' && itemCount > 0 && (
                                    <View style={styles.badgeContainer}>
                                      <Text style={styles.badgeText}>{itemCount}</Text>
                                    </View>
                                  )}
                                </View>
                              );
                          } else if(route.name==='OrdersTab'){
                            iconName = focused ? 'receipt' : 'receipt-outline';
                        } else if(route.name==='ProfileTab'){
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Icon name={iconName} size={width * 0.055} color={color} />
                        
                    },
                    tabBarActiveTintColor:'#407CE2',
                    tabBarInactiveTintColor: '#221F1F99',



            }}}
        >
            <Tab.Screen  options={{tabBarLabel:'Home'}} name="HomeTab" component={HomeStack} />
            <Tab.Screen  options={{tabBarLabel:'Cart'}} name="CartTab" component={CartStack}   />
            <Tab.Screen  options={{tabBarLabel:'Bookings'}} name='OrdersTab' component={OrdersStack} />
            <Tab.Screen  options={{tabBarLabel:'Profile'}} name="ProfileTab" component={ProfileStack}   />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator;