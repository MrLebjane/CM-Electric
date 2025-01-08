import React, { useState, useEffect,useCallback } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import Constants from "expo-constants";
import axios from 'axios';
import { getDataFromStorage,setDataToStorage,STORAGE_CLIENTBOOKID} from './DataStorage';

const CustomerInfoPage = () => {

  const [bookID, setData] = useState('');

  const fetchData = async () => {
    const storeData = await getDataFromStorage(STORAGE_CLIENTBOOKID);
    setData(storeData);
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  const [customer, setCustomer] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    phoneNumber: '',
    service: '',
    date: '',
  });
  
  const Customer = useCallback(() => {
  const {manifest}=Constants;
  const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
  axios.get(''+uri+'/getuserbooking/'+bookID, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    })
  .then(response => {
     setCustomer(response.data);
     })
  .catch(error => {
    // Handle any errors that occurred during the requestr
    //  alert('Error occurred while fetching user data');
  });
  });

  Customer();
  
  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Customer Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name: {customer.user_Name} </Text>
        {/* <Text style={styles.value}>{customer.user_Name}</Text> */}

        <Text style={styles.label}>Surname: {customer.user_Surname}</Text>
        {/* <Text style={styles.value}>{customer.user_Surname}</Text> */}

        <Text style={styles.label}>Email Address: {customer.user_Email}</Text>
        {/* <Text style={styles.value}>{customer.email}</Text> */}

        <Text style={styles.label}>Home Address: {customer.address}</Text>
        {/* <Text style={styles.value}>{customer.address}</Text> */}

        <Text style={styles.label}>Phone Number: {customer.user_Phone}</Text>
        {/* <Text style={styles.value}>{customer.phoneNumber}</Text> */}

        <Text style={styles.label}>Service: {customer.service}</Text>
        {/* <Text style={styles.value}>{customer.service}</Text> */}

        <Text style={styles.label}>Appointment date: {customer.appointmentDate}</Text>
        {/* <Text style={styles.value}>{customer.date}</Text> */}
      </View>

    
    </View>
  );
  
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default CustomerInfoPage;
