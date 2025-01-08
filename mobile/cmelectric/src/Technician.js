import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
 const Stack = createStackNavigator();

const TechnicianSidebar = ({ activeTab } ) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();
  // const {data} = route.params;
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
    setSidebarOpen(false);
  };

  const sidebarItems = [
    { screenName: 'HomeScreen', icon: 'md-home', label: 'Home' },
    { screenName: 'Assigned Appointments', icon: 'md-eye', label: 'View Appointments' },
    { screenName: 'Approved Appointments', icon: 'md-eye', label: 'Approved Appointments' },
    { screenName: 'Inspection Appointments', icon: 'md-recording', label: 'Inspection Appointments' }, 
  ];



  return ( 
       <View style={styles.container}>
      
        <ScrollView style={styles.sidebar}>
          {sidebarItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabItem,
                activeTab === item.screenName ? styles.activeTabItem : null,
              ]}
              onPress={() => handleTabPress(item.screenName)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={activeTab === item.screenName ? '#FF0000' : '#888888'}
              />
              <Text style={styles.tabLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      

      {/* <Text>data : JSON.stringify(data)</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    
    // // backgroundColor: '#FFDDBB',
    // backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // This will position the container absolutely within its parent
    top: 0, // Align the container to the top
    right: 0, // Align the container to the left
    zIndex: 1, // Ensure the container is above other elements on the screen
    backgroundColor: '#F0F0F0',
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#888888',
  },
  listLabel: {
    fontSize: 20,
  },
  sidebar: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#888888',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#888888',
  },
  activeTabItem: {
    backgroundColor: '#EEEEEE',
  },
  tabLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default TechnicianSidebar;
