import { useContext, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CartContext } from '../components/CartContext';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        // padding: width * 0.05,
    },
    scrollViewContent:{
        padding: width * 0.05,
    },
    headingContainer: {
      flexDirection: 'row',
      backgroundColor: "#f9f9f9",
      // marginTop: width * 0.0,
      borderRadius: width * 0.05,
      padding:  width * 0.04,
      marginBottom:  width * 0.05,
      elevation:  width * 0.02,
      width: '100%',
      shadowColor: "#000",
      shadowOpacity:  width * 0.02,
      shadowRadius:  width * 0.02,
      shadowOffset: { width: 0, height: 2 },
      alignSelf: 'center'

    },
    image: {
        width: width * 0.22,
        height: width * 0.25,
        resizeMode: "contain",
        marginRight: width * 0.05,
    },
    name: {
    fontSize: width * 0.057,
    fontWeight: 'bold',
    marginBottom: width * 0.04
  },
  price: {
    color: '#3B82F6',
    fontWeight: 'bold',
    fontSize: width * 0.040,
    marginBottom: width * 0.01,
  },
  gender: {
    fontSize: width * 0.037,
    color: '#444',
  },
   infoContainer: {
      flexDirection: 'col',
      justifyContent: 'space-between',
      marginTop: height * 0.02,
      // paddingHorizontal: width * 0.04,
  },
  pill: {
    backgroundColor: '#f9f9f9', 
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    color: '#334155', 
    fontWeight: '600',
    fontSize: width * 0.037,
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    elevation: 2,
    alignSelf: 'center',
    marginBottom: height * 0.025,
  },
  pill2: {
    backgroundColor: '#f9f9f9', 
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05, 
    color: '#334155', 
    fontWeight: '600',
    fontSize: width * 0.037,
    textAlign: 'center',
    overflow: 'hidden',
    width: '50%',
    elevation: 2,
    alignSelf:'auto',
    marginBottom: height * 0.025,
  },
  descriptionContainer: {
  marginTop: height * 0.01,
  // paddingHorizontal: width * 0.05,
},

descriptionHeading: {
  fontSize: width * 0.045,
  fontWeight: 'bold',
  marginBottom: height * 0.01,
},

descriptionText: {
  fontSize: width * 0.037,
  color: '#334155',
  // lineHeight: 22,
},
cartButton: {
  backgroundColor: '#3B82F6',
  width: '100%',
  paddingVertical: height * 0.015,
  paddingHorizontal: width * 0.1,
  marginBottom: width * 0.05,
  borderRadius: width * 0.5, 
  alignItems: 'center',
  marginTop: height * 0.03,
  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: width * 0.02,
  shadowOffset: { width: width * 0, height: width * 0.02 },
  shadowRadius: width * 0.02,
},

cartButtonText: {
  color: '#FFFFFF',
  fontSize: width * 0.045,
  fontWeight: 'bold',
  letterSpacing: 1,

},
  sectionHeading: {
    width : '100%',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
    // marginLeft: width * 0.01,
  },
  slotCard: {
    backgroundColor: '#f9f9f9',
    borderColor: '#F3F0F0', // soft gray
    borderWidth: 1, 
    borderRadius: width * 0.05,
    // paddingVertical: width * 0.05,
    paddingHorizontal: width * 0.025,
    height: width * 0.17,
    marginRight: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSlot: {
    backgroundColor: '#407CE2',
    color : 'white',
    shadowColor: '#000',
    elevation: 2,
    shadowOpacity: width * 0.05,
    shadowOffset: { width: width * 0, height: width * 0.02 },
    shadowRadius: width * 0.05,
      
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
    fontWeight: 'bold',
  },
  slotText: {
    fontSize: width * 0.036,
    color: '#1E293B',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionView:{
    marginBottom: width * 0.05,
  },
  quantityHeading: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    // marginBottom: height * 0.01,
  }
  


})
const LabTestDetailScreen = ({route}) => {
  const { addToCart } = useContext(CartContext);

 const dates = ['12 Feb Fri','13 Feb Sat', '14 Feb Sun', '15 Feb Mon','16 Feb Tue', '17 Feb Fri','18 Feb Sat', '19 Feb Sun', '20 Feb Mon','21 Feb Tue'];

 const times = [ '9:00 AM', '10:00 AM', '11:00 AM','12:00 PM', '1:00 PM','2:00 PM','3:00 PM', '4:00 PM','5:00 PM' ,'6:00 PM' ,'7:00 PM' ,'8:00 PM' ,'9:00 PM' ,'10:00 PM'];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [ quantity, setQuantity] = useState(1); 
  const { labtest } = route.params;
  const [labTest, setLabTest] = useState(labtest);
  const [showDateTimeSlots, setShowDateTimeSlots] = useState(false);

 
  
const getSlotsForDate = (selectedDate) => {
  const now = new Date();

 
  if (
    selectedDate.getDate() !== now.getDate() ||
    selectedDate.getMonth() !== now.getMonth() ||
    selectedDate.getFullYear() !== now.getFullYear()
  ) {
    return times;
  }

  const currentHour = now.getHours();

  return times.filter((slot) => {
    const [time, period] = slot.split(' ');
    let hour = parseInt(time.split(':')[0]);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour > currentHour;
  });
};


const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      const slotsToday = getSlotsForDate(today);
      if (slotsToday.length === 0) {
      
        continue;
      }
    }

    const label = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    dates.push({
      dateObj: date,
      label,
    });
  }

  return dates;
};

const dateOptions = generateDates();





const handleSelectDate = (dateObj) => {
  setSelectedDate(dateObj);
  const slots = getSlotsForDate(dateObj);
  setAvailableSlots(slots);
};

const isSameDay = (d1, d2) => (
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate()
);



  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleDisplayOfDateTime = () => {
    if(showDateTimeSlots === false){
      setShowDateTimeSlots(true);
    }else{
      setShowDateTimeSlots(false);
    }
      
  }

  const handleAddToCart = ()=>{
    if (!selectedDate || !selectedTime) {
      Toast.show({
        type: 'error',
        text1: 'Please select a date and time',
      });
      return;
  }

    addToCart({...labTest,quantity:quantity,date:selectedDate,time:selectedTime})
    Toast.show({
      type: 'success',
      text1: 'Lab Test Added to Cart!',
    });
    setShowDateTimeSlots(false)
    setSelectedDate(null)
    setSelectedTime(null)
    setQuantity(1);

  }

    return(
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.headingContainer}>
                <View>
                    <Image style={styles.image} source={labTest.image} />

                </View>

                <View>
                    <Text style={styles.name}>{labTest.name}</Text>
                    <Text style={styles.price}>Rs {labTest.price}</Text>
                    <Text style={styles.gender}>This lab test is for both genders</Text>
                   
                </View>

            </View>

            <View style={styles.infoContainer}>
                
              <Text style={styles.pill}>Sample Type: {labTest.sampleType}</Text>

              <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginTop: height * 0.02 }}>
                {/* <Text style={styles.quantityHeading}>Quantity</Text> */}
                  <Text style={styles.pill2}>Time: {labTest.turnAroundTime} {labTest.turnAroundTime===1 ? 'day' : 'days'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <Pressable onPress={decrementQuantity} style={{ padding: 8 }} >
                        <Icon  name="minus-circle-outline" size={28} color="#475569"/>
                      </Pressable>

                      <Text style={{ marginHorizontal: 16, fontSize: width * 0.05, fontWeight: 'bold' }}>{quantity}</Text>

                      <Pressable onPress={incrementQuantity} style={{ padding: 8 }} >
                        <Icon name="plus-circle-outline" size={28} color="#475569"/>
                      </Pressable>

                    </View>
              </View>

            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionHeading}>Description</Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>{labTest.description}</Text>
                </View>
            </View>


            <Pressable style={styles.cartButton} onPress={showDateTimeSlots ? handleAddToCart : handleDisplayOfDateTime}>
              <Text style={styles.cartButtonText}>
                {showDateTimeSlots ? 'Add to Cart' : 'Select Date and Time'}
              </Text>
            </Pressable>

            {showDateTimeSlots && (
              <View>
                <Text style={styles.sectionHeading}>Select Date</Text>
                <View style={styles.sectionView}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {dateOptions.map((date, index) => (
                        <Pressable  key={index}  onPress={() => handleSelectDate(date.dateObj)}  style={[styles.slotCard,
                          selectedDate && isSameDay(selectedDate, date.dateObj) && styles.selectedSlot
                         ]}>
                          <Text  style={[
        styles.slotText,
        selectedDate && isSameDay(selectedDate, date.dateObj) && styles.selectedText
      ]}> 
                            {date.label}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                </View>
                  {selectedDate && ( 
                    <>
                       <Text style={styles.sectionHeading}>Select Time</Text>
                      <View style={styles.sectionView}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          {availableSlots.map((time, index) => (
                            <Pressable key={index} onPress={() => setSelectedTime(time)} style={[ styles.slotCard,  selectedTime === time && styles.selectedSlot ]} >
                              <Text  style={[  selectedTime === time && styles.selectedText]}>{time}</Text>
                            </Pressable>
                          ))}

                        </ScrollView>
                    </View>
                    </>
                  )}
                   
                  </View>

            )} 

          </ScrollView>
            
        </View>
    )
}

export default LabTestDetailScreen


// import { useContext, useState } from "react";
// import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import Toast from 'react-native-toast-message';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { CartContext } from '../components/CartContext';

// const { width, height } = Dimensions.get('window');
// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: "white",
//         // padding: width * 0.05,
//     },
//     scrollViewContent:{
//         padding: width * 0.05,
//     },
//     headingContainer: {
//       flexDirection: 'row',
//       backgroundColor: "#f9f9f9",
//       // marginTop: width * 0.0,
//       borderRadius: width * 0.05,
//       padding:  width * 0.04,
//       marginBottom:  width * 0.05,
//       elevation:  width * 0.02,
//       width: '100%',
//       shadowColor: "#000",
//       shadowOpacity:  width * 0.02,
//       shadowRadius:  width * 0.02,
//       shadowOffset: { width: 0, height: 2 },
//       alignSelf: 'center'

//     },
//     image: {
//         width: width * 0.22,
//         height: width * 0.25,
//         resizeMode: "contain",
//         marginRight: width * 0.05,
//     },
//     name: {
//     fontSize: width * 0.057,
//     fontWeight: 'bold',
//     marginBottom: width * 0.04
//   },
//   price: {
//     color: '#3B82F6',
//     fontWeight: 'bold',
//     fontSize: width * 0.040,
//     marginBottom: width * 0.01,
//   },
//   gender: {
//     fontSize: width * 0.037,
//     color: '#444',
//   },
//    infoContainer: {
//       flexDirection: 'col',
//       justifyContent: 'space-between',
//       marginTop: height * 0.02,
//       // paddingHorizontal: width * 0.04,
//   },
//   pill: {
//     backgroundColor: '#f9f9f9', 
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.05,
//     borderRadius: width * 0.05,
//     color: '#334155', 
//     fontWeight: '600',
//     fontSize: width * 0.037,
//     textAlign: 'center',
//     overflow: 'hidden',
//     width: '100%',
//     elevation: 2,
//     alignSelf: 'center',
//     marginBottom: height * 0.025,
//   },
//   pill2: {
//     backgroundColor: '#f9f9f9', 
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.05,
//     borderRadius: width * 0.05, 
//     color: '#334155', 
//     fontWeight: '600',
//     fontSize: width * 0.037,
//     textAlign: 'center',
//     overflow: 'hidden',
//     width: '50%',
//     elevation: 2,
//     alignSelf:'auto',
//     marginBottom: height * 0.025,
//   },
//   descriptionContainer: {
//   marginTop: height * 0.01,
//   // paddingHorizontal: width * 0.05,
// },

// descriptionHeading: {
//   fontSize: width * 0.045,
//   fontWeight: 'bold',
//   marginBottom: height * 0.01,
// },

// descriptionText: {
//   fontSize: width * 0.037,
//   color: '#334155',
//   // lineHeight: 22,
// },
// cartButton: {
//   backgroundColor: '#3B82F6',
//   width: '100%',
//   paddingVertical: height * 0.015,
//   paddingHorizontal: width * 0.1,
//   marginBottom: width * 0.05,
//   borderRadius: width * 0.5, 
//   alignItems: 'center',
//   marginTop: height * 0.03,
//   elevation: 4,
//   shadowColor: '#000',
//   shadowOpacity: width * 0.02,
//   shadowOffset: { width: width * 0, height: width * 0.02 },
//   shadowRadius: width * 0.02,
// },

// cartButtonText: {
//   color: '#FFFFFF',
//   fontSize: width * 0.045,
//   fontWeight: 'bold',
//   letterSpacing: 1,

// },
//   sectionHeading: {
//     width : '100%',
//     fontWeight: 'bold',
//     fontSize: width * 0.045,
//     marginBottom: height * 0.01,
//     // marginLeft: width * 0.01,
//   },
//   slotCard: {
//     backgroundColor: '#f9f9f9',
//     borderColor: '#F3F0F0', // soft gray
//     borderWidth: 1, 
//     borderRadius: width * 0.05,
//     // paddingVertical: width * 0.05,
//     paddingHorizontal: width * 0.025,
//     height: width * 0.17,
//     marginRight: width * 0.03,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedSlot: {
//     backgroundColor: '#407CE2',
//     color : 'white',
//     shadowColor: '#000',
//     elevation: 2,
//     shadowOpacity: width * 0.05,
//     shadowOffset: { width: width * 0, height: width * 0.02 },
//     shadowRadius: width * 0.05,
      
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontWeight: 'bold',
//   },
//   slotText: {
//     fontSize: width * 0.036,
//     color: '#1E293B',
//     fontWeight: 'bold',
//   },
//   selectedText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   sectionView:{
//     marginBottom: width * 0.05,
//   },
//   quantityHeading: {
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//     // marginBottom: height * 0.01,
//   }
  


// })
// const LabTestDetailScreen = ({route}) => {
//   const { addToCart } = useContext(CartContext);

//  const dates = ['12 Feb Fri','13 Feb Sat', '14 Feb Sun', '15 Feb Mon','16 Feb Tue', '17 Feb Fri','18 Feb Sat', '19 Feb Sun', '20 Feb Mon','21 Feb Tue'];

//  const times = [ '9:00 AM', '10:00 AM', '11:00 AM','12:00 PM', '1:00 PM','2:00 PM','3:00 PM', '4:00 PM','5:00 PM' ,'6:00 PM' ,'7:00 PM' ,'8:00 PM' ,'9:00 PM' ,'10:00 PM'];

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);

//   const [ quantity, setQuantity] = useState(1); 
//   const [labTest, setLabTest] = useState(route.params);
//   const [showDateTimeSlots, setShowDateTimeSlots] = useState(false);

 
  
// const getSlotsForDate = (selectedDate) => {
//   const now = new Date();

 
//   if (
//     selectedDate.getDate() !== now.getDate() ||
//     selectedDate.getMonth() !== now.getMonth() ||
//     selectedDate.getFullYear() !== now.getFullYear()
//   ) {
//     return times;
//   }

//   const currentHour = now.getHours();

//   return times.filter((slot) => {
//     const [time, period] = slot.split(' ');
//     let hour = parseInt(time.split(':')[0]);

//     if (period === 'PM' && hour !== 12) hour += 12;
//     if (period === 'AM' && hour === 12) hour = 0;

//     return hour > currentHour;
//   });
// };


// const generateDates = () => {
//   const dates = [];
//   const today = new Date();

//   for (let i = 0; i < 14; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);

//     const isToday =
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear();

//     if (isToday) {
//       const slotsToday = getSlotsForDate(today);
//       if (slotsToday.length === 0) {
      
//         continue;
//       }
//     }

//     const label = date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//     });

//     dates.push({
//       dateObj: date,
//       label,
//     });
//   }

//   return dates;
// };

// const dateOptions = generateDates();





// const handleSelectDate = (dateObj) => {
//   setSelectedDate(dateObj);
//   const slots = getSlotsForDate(dateObj);
//   setAvailableSlots(slots);
// };

// const isSameDay = (d1, d2) => (
//   d1.getFullYear() === d2.getFullYear() &&
//   d1.getMonth() === d2.getMonth() &&
//   d1.getDate() === d2.getDate()
// );



//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   const decrementQuantity = () => {
//     setQuantity((prev) => Math.max(1, prev - 1))
//   }

//   const handleDisplayOfDateTime = () => {
//     if(showDateTimeSlots === false){
//       setShowDateTimeSlots(true);
//     }else{
//       setShowDateTimeSlots(false);
//     }
      
//   }

//   const handleAddToCart = ()=>{
//     if (!selectedDate || !selectedTime) {
//       Toast.show({
//         type: 'error',
//         text1: 'Please select a date and time',
//       });
//       return;
//   }

//     addToCart({...labTest,quantity:quantity,date:selectedDate,time:selectedTime})
//     Toast.show({
//       type: 'success',
//       text1: 'Lab Test Added to Cart!',
//     });
//     setShowDateTimeSlots(false)
//     setSelectedDate(null)
//     setSelectedTime(null)
//     setQuantity(1);

//   }

//     return(
//         <View style={styles.container}>
//           <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={styles.scrollViewContent}>
//             <View style={styles.headingContainer}>
//                 <View>
//                     <Image style={styles.image} source={require('../../assets/images/bloodTestCategoryImg.png')} />

//                 </View>

//                 <View>
//                     <Text style={styles.name}>{labTest.name}</Text>
//                     <Text style={styles.price}>Rs{labTest.price}</Text>
//                     <Text style={styles.gender}>{labTest.gender}</Text>
                   
//                 </View>

//             </View>

//             <View style={styles.infoContainer}>
                
//               <Text style={styles.pill}>{labTest.sampleRequired}</Text>

//               <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginTop: height * 0.02 }}>
//                 {/* <Text style={styles.quantityHeading}>Quantity</Text> */}
//                   <Text style={styles.pill2}>{labTest.turnaroundTime}</Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                       <Pressable onPress={decrementQuantity} style={{ padding: 8 }} >
//                         <Icon  name="minus-circle-outline" size={28} color="#475569"/>
//                       </Pressable>

//                       <Text style={{ marginHorizontal: 16, fontSize: width * 0.05, fontWeight: 'bold' }}>{quantity}</Text>

//                       <Pressable onPress={incrementQuantity} style={{ padding: 8 }} >
//                         <Icon name="plus-circle-outline" size={28} color="#475569"/>
//                       </Pressable>

//                     </View>
//               </View>

//             </View>

//             <View style={styles.descriptionContainer}>
//                 <Text style={styles.descriptionHeading}>Description</Text>
//                 <View style={styles.descriptionBox}>
//                     <Text style={styles.descriptionText}>{labTest.description}</Text>
//                 </View>
//             </View>


//             <Pressable style={styles.cartButton} onPress={showDateTimeSlots ? handleAddToCart : handleDisplayOfDateTime}>
//               <Text style={styles.cartButtonText}>
//                 {showDateTimeSlots ? 'Add to Cart' : 'Select Date and Time'}
//               </Text>
//             </Pressable>

//             {showDateTimeSlots && (
//               <View>
//                 <Text style={styles.sectionHeading}>Select Date</Text>
//                 <View style={styles.sectionView}>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                       {dateOptions.map((date, index) => (
//                         <Pressable  key={index}  onPress={() => handleSelectDate(date.dateObj)}  style={[styles.slotCard,
//                           selectedDate && isSameDay(selectedDate, date.dateObj) && styles.selectedSlot
//                          ]}>
//                           <Text  style={[
//         styles.slotText,
//         selectedDate && isSameDay(selectedDate, date.dateObj) && styles.selectedText
//       ]}> 
//                             {date.label}
//                           </Text>
//                         </Pressable>
//                       ))}
//                     </ScrollView>
//                 </View>
//                   {selectedDate && ( 
//                     <>
//                        <Text style={styles.sectionHeading}>Select Time</Text>
//                       <View style={styles.sectionView}>
//                         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                           {availableSlots.map((time, index) => (
//                             <Pressable key={index} onPress={() => setSelectedTime(time)} style={[ styles.slotCard,  selectedTime === time && styles.selectedSlot ]} >
//                               <Text  style={[  selectedTime === time && styles.selectedText]}>{time}</Text>
//                             </Pressable>
//                           ))}

//                         </ScrollView>
//                     </View>
//                     </>
//                   )}
                   
//                   </View>

//             )} 

//           </ScrollView>
            
//         </View>
//     )
// }

// export default LabTestDetailScreen