import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList, Modal, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

const SampleDropdown = ({ selected, onSelect }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const sampleTypes = [
    "Blood",
    "Urine",
    "Saliva",
    "Stool",
    "Liver Tissue"
  ];
  
  return (
    <>
      <Text style={styles.label}>Sample Type</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: selected ? '#000' : '#aaa' }}>
          {selected || 'Select Category'}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={sampleTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SampleDropdown;

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCancel: {
    marginTop: 16,
    textAlign: 'center',
    color: '#0066ff',
    fontWeight: 'bold',
  },
});
