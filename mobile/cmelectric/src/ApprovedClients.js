import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import Constants from "expo-constants";
import { getDataFromStorage, setDataToStorage, STORAGE_TECH } from './DataStorage';
import Modal from 'react-native-modal';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';

const ApprovedClients = () => {
  const [DATA, setDATA] = useState([]);
  const [clientDates, setClientDates] = useState([]);
  const [clientTech, setClientTech] = useState('');
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [Bookid, setBookid] = useState('');

  const today = new Date(); // Get today's date
  const todayString = today.toISOString().split('T')[0];

  const fetchData = async () => {
    const storeData = await getDataFromStorage(STORAGE_TECH);
    setClientTech(storeData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
    axios.get('' + uri + '/getapprovedclients/' + clientTech, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setDATA(response.data);
      })
      .catch(error => {
        // console.error(error);
        // alert('Error occurred while fetching user data');
      });
  }, [clientTech,DATA]);

  useEffect(() => {
    if (Bookid) {
      const { manifest } = Constants;
      const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
      axios.get('' + uri + '/getclienttaskdate/' + Bookid, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setClientDates(response.data);
        })
        .catch(error => {
            console.error(error);
            alert('Error occurred while fetching user data');
        });
    }
  }, [Bookid,clientDates]);

  const updateClientTaskDate = async (taskDate) => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

    try {
      const response = await axios.post('' + uri + '/addclienttaskdate/' + Bookid, { taskdate: taskDate }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      alert('Job date successfully added.');
    } catch (error) {
      console.error(error);
      alert('Error occurred while adding the job date');
    }
  };

  const deleteClientTaskDate = useCallback((clientTaskDate_ID) => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

    axios.delete('' + uri + '/deletetaskdate/' + clientTaskDate_ID, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        alert('Removed.');
      })
      .catch(error => {
        console.error(error);
        alert('Error occurred while completing the job');
      });
  });

  const openModal = useCallback((bookID) => {
    setBookid(bookID);
    setModal(true);
    setSelected(''); // Reset selected date when opening the modal
  });

  const completeTask = useCallback((bookID) => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

    axios.put('' + uri + '/completetask/' + bookID, { JobComplete: "1" }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        alert('Successfully completed the job');
      })
      .catch(error => {
        console.error(error);
        alert('Error occurred while completing the job');
      });
  });

  const renderAppointmentItem = ({ item }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.customerInfo}>
          <Text style={styles.cell}>{item.book_ID}</Text>
          <Text style={styles.cell}>{item.user_Name}</Text>
          <Text style={styles.cell}>{item.user_Surname}</Text>
          <Text style={styles.cell}>{moment(item.appointmentDate).format('MMMM Do YYYY, h:mm a')}</Text>
          <Text style={styles.cell}>{item.service}</Text>
          <TouchableOpacity style={styles.viewButton} onPress={() => openModal(item.book_ID)}>
            <Text style={styles.viewButtonText}>Assign</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton} onPress={() => completeTask(item.book_ID)}>
            <Text style={styles.viewButtonText}>Complete Job</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAppointmentCalender = ({ item }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.customerInfo}>
          <Text style={styles.cell}>{item.clienttaskdate}</Text>
          <TouchableOpacity style={styles.viewButton} onPress={()=> deleteClientTaskDate(item.clienttask_ID)} >
            <Text style={styles.viewButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Ref. ID</Text>
        <Text style={styles.headerText}>Full Names</Text>
        <Text style={styles.headerText}>Last Name</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Service</Text>
        <Text style={styles.headerText}>Job Date</Text>
        <Text style={styles.headerText}>Complete</Text>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.book_ID.toString()}
        renderItem={renderAppointmentItem}
      />
      <Modal isVisible={modal} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text>Assign job date</Text>
          <Calendar
            onDayPress={async (day) => {
              setSelected(day.dateString);
              await updateClientTaskDate(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: '#ec2727' }
            }}
            minDate={todayString}
          />
          <View style={styles.tableContainer}>
            <Text style={styles.headerText}>Selected dates for:</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Remove</Text>
            </View>
            <FlatList
              data={clientDates}
              keyExtractor={(_clientDates) => _clientDates.clienttask_ID.toString()}
              renderItem={renderAppointmentCalender}
              initialNumToRender={10}
              removeClippedSubviews={true}
            />
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => setModal(false)}>
            <Text style={styles.viewButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontSize: 10,
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
    fontSize: 10,
  },
  viewButton: {
    padding: 8,
    backgroundColor: '#ec2727',
    borderRadius: 4,
    maxWidth: 50,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 7,
  },
  modalContent: {
    backgroundColor: 'white', // Set the background color to white
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent:'center',
    
  },

  // Modify the modal's background color to make it transparent
  modal: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent:'center',
  },
});

export default ApprovedClients;
