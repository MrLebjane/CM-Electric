import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const InventoryPage = ({ isSidebarOpen, navigation }) => {
  return (
    <View style={[styles.container, !isSidebarOpen && styles.minimizedContainer]}>
      <View style={styles.heading}>
        <Text style={styles.headlogo}>
          <MaterialCommunityIcons name="warehouse" size={28} color="black" />
          Inventory
        </Text>
      </View>
      <View style={styles.AllInventory}>
        <View style={styles.Inventorylist}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Borehole')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Borehole motors</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Air Conditioner')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Air Conditioner</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Generator')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Generator</Text>
          </TouchableOpacity>

          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Solar System')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Solar System</Text>
          </TouchableOpacity>

          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Electric Fence')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Electric Fence</Text>
          </TouchableOpacity>

          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Car Lifts')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>Car Lifts</Text>
          </TouchableOpacity>
          
          <View style={styles.space} />
          <TouchableOpacity
            onPress={() => navigation.navigate('House Wiring')}
            style={styles.stockLink}
          >
            <Text style={styles.stockText}>House Wiring</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  minimizedContainer: {
    // Add styles for minimized container if needed
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headlogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  AllInventory: {
    flex: 1,
  },
  Inventorylist: {
    flex: 1,
  },
  stockLink: {
    paddingVertical: 10,
    backgroundColor: '#ec2727',
  },
  stockText: {
    color: '#ffffff',
    textDecorationLine: 'none',
    fontSize: 18,
  },
  space: {
    height: 30, 
  },
});

export default InventoryPage;
