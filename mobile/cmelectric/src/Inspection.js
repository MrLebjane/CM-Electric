import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import {
  getDataFromStorage,
  setDataToStorage,
  STORAGE_BOOKID,
  STORAGE_CLIENTID,
} from './DataStorage';
import AppointmentViewer from './ViewAppointment';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const Inspection = () => {
  const [selectedService, setSelectedService] = useState('');
  const [record, setRecord] = useState('');
  const [time, setTime] = useState('');
  const [inspectionResult, setInspectionResult] = useState('');
  const [DATA, setDATA] = useState([]);
  const [clientstock, setClientStock] = useState([]);
  const [clientId, setClientID] = useState('');
  const [bookID, setBookID] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storeData = await getDataFromStorage(STORAGE_BOOKID);
      setBookID(storeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClientID = async () => {
      const storeData = await getDataFromStorage(STORAGE_CLIENTID);
      setClientID(storeData);
    };

    fetchClientID();
  }, []);

  useEffect(() => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
    axios
      .get('' + uri + '/getallstock', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setDATA(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred while fetching user data');
      });
  }, []);

  useEffect(() => {
    if (bookID) {
      const { manifest } = Constants;
      const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
      axios
        .get('' + uri + '/getclientstock/' + bookID, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setClientStock(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert('Error occurred while fetching user data');
        });
    }
  }, [clientstock,added,bookID]);

  const addInspection = useCallback((itemid) => {
    if (bookID) {
      const { manifest } = Constants;
      const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

      axios
        .post('' + uri + '/addclientstock', {
          book_ID: '' + bookID + '',
          item_ID: '' + itemid + '',
        })
        .then((response) => {
          console.log(bookID);
          console.log(response.data);
          setAdded(true)
          alert('Successfully added an item.');
        })
        .catch((error) => {
          console.error(error);
          alert('Error occurred while fetching user data');
        });
    }
  }, [bookID]);

  const deleteItem = useCallback((clientStock_ID) => {
    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

    axios
      .delete('' + uri + '/deleteclientstock/' + clientStock_ID)
      .then((response) => {
        console.log(response.data);
        setAdded(false)
        alert('Successfully removed an item.');
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred while fetching user data');
      });
  });

  const renderAppointmentItem = ({ item }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.customerInfo}>
          <Text style={styles.cell}>{item.item_Category}</Text>
          <Text style={styles.cell}>{item.item_Name}</Text>
          <Text style={styles.cell}>{item.item_Brand}</Text>
          <Text style={styles.cell}>{item.item_Capacity}</Text>
          <Text style={styles.cell}>R{item.item_Price}</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => addInspection(item.item_ID)}>
            <Text style={styles.viewButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAppointmentItem1 = ({ item }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.customerInfo}>
          <Text style={styles.cell}>{item.item_Category}</Text>
          <Text style={styles.cell}>{item.item_Name}</Text>
          <Text style={styles.cell}>{item.item_Brand}</Text>
          <Text style={styles.cell}>{item.item_Capacity}</Text>
          <Text style={styles.cell}>{item.item_Quantity}</Text>
          <Text style={styles.cell}>R{item.item_Price}</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => deleteItem(item.clientStock_ID)}>
            <Text style={styles.viewButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const putInspection = useCallback(() => {
    if (!record) {
      alert('Please enter a record before submitting.');
      return;
    } else {
      alert('Successfully recorded inspection.');
    }

    const { manifest } = Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';

    axios
      .put('' + uri + '/recordinspection/' + bookID, { Inspection: record, time: time }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred while fetching user data');
      });
  }, [record, time, bookID]);

  const navigation = useNavigation();
  const handleViewPress = () => {
    navigation.navigate('Information');
  };

  const handleTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setTime(numericText);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <View style={styles.containers}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Item Name"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Category</Text>
          <Text style={styles.headerText}>Item Name</Text>
          <Text style={styles.headerText}>Brand</Text>
          <Text style={styles.headerText}>Capacity</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerText}>Add</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ maxHeight: 200 }}>
          <FlatList
            scrollEnabled={false}
            data={DATA.filter((item) =>
              item.item_Name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => item.item_ID.toString()}
            renderItem={renderAppointmentItem}
          />
        </ScrollView>

        <Text>{'\n'}{'\n'}</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.headerText1}>Selected Items</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Category</Text>
          <Text style={styles.headerText}>Item Name</Text>
          <Text style={styles.headerText}>Brand</Text>
          <Text style={styles.headerText}>Capacity</Text>
          <Text style={styles.headerText}>Quantity</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerText}>Delete</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ maxHeight: 300 }}>
          <FlatList
            scrollEnabled={false}
            initialNumToRender={10}
            windowSize={10}
            data={clientstock.filter((item) => item.item_Name.toLowerCase())}
            keyExtractor={(item) => item.item_ID.toString()}
            renderItem={renderAppointmentItem1}
          />
        </ScrollView>

        <TextInput
          style={styles.time}
          onChangeText={handleTextChange}
          value={time}
          placeholder="Enter estimated time"
          keyboardType="numeric"
          multiline
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setRecord(text)}
          value={record}
          placeholder="Enter record"
          multiline
        />

        <TouchableOpacity style={styles.RecordInspectionBtn} onPress={putInspection}>
          <Text style={styles.InspecText}>RECORD</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containers: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  fixedTable: {
    maxHeight: 200,
  },
  input: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  time: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 50,
    paddingHorizontal: 40,
  },
  InspecText: {
    color: 'white',
  },
  RecordInspectionBtn: {
    width: '100%',
    backgroundColor: '#ec2727',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
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
    fontSize: 9,
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
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
  },
  headerText1: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Inspection;
