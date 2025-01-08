import React, { useCallback, useState,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";
import { getDataFromStorage,setDataToStorage,STORAGE_CLIENT,STORAGE_TECH} from './DataStorage';

import axios from 'axios';
 

const Solar = ({route}) => {
  const [DATA,setDATA]=useState([]);
   
   //const { b_id } = route.params;
    //console.log(route.params.b_id);
    const [data, setData] = useState('');

    const fetchData = async () => {
      const storeData = await getDataFromStorage(STORAGE_TECH);
      setData(storeData);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    // console.log(data);
  const getClients = useCallback(() => {
    const {manifest}=Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
    axios.get(''+uri+'/gettechclients/'+data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
      })
    .then(response => {
      // Handle the response data
      setDATA(response.data);
      // console.log(response.data);
       
    })
    .catch(error => {
      // Handle any errors that occurred during the requestr
      // console.error(error);
      // alert('Error occurred while fetching user data');
    });
  });
 getClients();
  
  const renderAppointmentItem = ({ item }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.customerInfo}>
          <Text style={styles.cell}>{item.book_ID}</Text>
          <Text style={styles.cell}>{item.user_Name}</Text>
          <Text style={styles.cell}>{item.user_Surname}</Text>
          <Text style={styles.cell}>{moment(item.appointmentDate).format('MMMM Do YYYY, h:mm a')}</Text>
          <Text style={styles.cell}>{item.service}</Text>
          <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>   
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const navigation = useNavigation();
  const handleViewPress = () => {
      // Navigate to the RecordScreen 
      // setDataToStorage(STORAGE_CLIENT_ID,userID)
      navigation.navigate('Information');
  };
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Ref. ID</Text>
        <Text style={styles.headerText}>Full Names</Text>
        <Text style={styles.headerText}>Last Name</Text>
        <Text style={styles.headerText}> Date</Text>
        <Text style={styles.headerText}>Service </Text>
        <Text style={styles.headerText}>Info</Text>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.book_ID.toString()}
        renderItem={renderAppointmentItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  appointmentItem: {
    marginBottom: 10,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  viewButton: {
    padding: 8,
    backgroundColor: '#ec2727',
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Solar;
