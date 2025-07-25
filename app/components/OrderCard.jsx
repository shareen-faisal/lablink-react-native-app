import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderCard = ({ order }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          backgroundColor: '#dff6e7',
          borderColor: '#28a745',
          textColor: '#28a745'
        };
      case 'pending':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#d1b757',
          textColor: '#b7952e'
        };
      default:
        return {
          backgroundColor: '#e2e3e5',
          borderColor: '#d6d8db',
          textColor: '#383d41'
        };
    }
  };

  const statusStyles = getStatusStyle(order.status);

  return (
    <View style={styles.card}>
      {/* Top: Order ID & Date */}
      <View style={styles.rowBetween}>
        <Text style={styles.orderNo}>Order No: {order.id}</Text>
        <Text style={styles.date}>{order.date}</Text>
      </View>

      {/* Items List */}
      {order.items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={{ width: 220 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.pillsRow}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Date: {item.date}</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Time: {item.time}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.itemQty}>
            {item.quantity} x {item.price}
          </Text>
        </View>
      ))}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom: Total Price & Status */}
      <View style={styles.rowBetween}>
        <Text style={styles.total}>Total: Rs. {order.total}</Text>
        <View
          style={[
            styles.pillStatus,
            {
              backgroundColor: statusStyles.backgroundColor,
              borderColor: statusStyles.borderColor
            }
          ]}
        >
          <Text
            style={[
              styles.pillStatusText,
              { color: statusStyles.textColor }
            ]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1a1a1a',
  },
  date: {
    fontSize: 13,
    color: '#777',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemName: {
    fontSize: 14,
    color: '#000',
  },
  itemQty: {
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e2e2',
    marginVertical: 12,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  pillsRow: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 8,
  },
  pill: {
    backgroundColor: '#e6f0ff',
    borderColor: '#3b7cff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  pillText: {
    color: '#3b7cff',
    fontSize: 12,
  },
  pillStatus: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  pillStatusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
