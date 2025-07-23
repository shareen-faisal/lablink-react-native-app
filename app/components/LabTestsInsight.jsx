import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function LabTestsInsight() {

    const [totalLabTests , setTotalLabTests] =useState(0);

    const [testCounts, setTestCounts] = useState({
        heartHealth: 0,
        kidney: 0,
        diabetes: 0,
        blood: 0,
        liver: 0
      });

      const categories = [
        { name: 'Heart Health Tests', image: require('../../assets/images/heartHealthTestCategoryImg.png'), count: testCounts.heartHealth },
        { name: 'Blood Tests', image: require('../../assets/images/bloodTestCategoryImg.png'), count: testCounts.blood },
        { name: 'Liver Function Tests', image: require('../../assets/images/liverTestImg.png'), count: testCounts.liver },
        { name: 'Kidney Tests', image: require('../../assets/images/kidneyTestImg.png'), count: testCounts.kidney },
        { name: 'Diabetes Tests', image: require('../../assets/images/diabetesTestImg.png'), count: testCounts.diabetes },
      ];
      

    useEffect(()=> {
        handleCategories();
      }, [testCounts])
    
      const handleCategories = async () => {

        const counts = {
            heartHealth: 0,
            kidney: 0,
            diabetes: 0,
            blood: 0,
            liver: 0
          };
        let totalTests = 0;
    
        const labTests = await fetch('https://lablink-trial-default-rtdb.firebaseio.com/labTests.json');
        const data = await labTests.json();
    
        for(const labTest in data){
            if(data[labTest].category === 'Blood Tests'){
                counts.blood += 1;
            }else if(data[labTest].category === 'Diabetes Tests'){
                counts.diabetes += 1;
            }else if(data[labTest].category === 'Heart Health Tests'){
                counts.heartHealth += 1;
            }else if(data[labTest].category ===  'Liver Function Tests'){
                counts.liver += 1;
            }else if(data[labTest].category === 'Kidney Tests'){
                counts.kidney += 1;
            }

            totalTests += 1;
        }
    
       setTestCounts(counts);
       setTotalLabTests(totalTests);
          
      }

    return (
        <View style={styles.summaryBox}>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Lab Tests</Text>
                <View style={styles.countCircle}>
                    <Text style={styles.countText}>{totalLabTests}</Text>
                </View>

            </View>

            {categories.map((item, index) => (
                <View key={index} style={styles.categoryRow}>
                    <Image source={item.image} style={styles.categoryImage} />
                    <Text style={styles.categoryText}>{item.name}</Text>
                    <View style={styles.countCircle}>
                        <Text style={styles.countText}>{item.count}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    summaryBox: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    categoryImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 12,
    },
    categoryText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    countText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3b7cff',
    },
    countCircle: {
        width: 32,
        height: 32,
        borderRadius: 16, 
        backgroundColor: '#e6f0ff',
        borderColor: '#3b7cff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      countText: {
        color: '#3b7cff',
        fontWeight: 'bold',
        fontSize: 14,
      },
      
});
