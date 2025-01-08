import { useNavigation,NavigationContainer } from '@react-navigation/native';
import React, { useState,useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
// import ManagerSidebar from './src/manager';
import TechnicianSidebar from './src/Technician';
import HomeScreen from './src/HomeScreen';
import { Calendar } from 'react-native-big-calendar'
// import AppointmentScreen  from './src/AppointmentScreen';
import SettingsScreen from './src/SettingsScreen';
import ViewAppointment from "./src/ViewAppointment";
import Inspection from './src/Inspection';
import axios from 'axios';
import Constants from "expo-constants";
 import CustomerList from './src/CustomerList';
import CustomerInfoPage from './src/ViewInformation';
import { DarkModeProvider } from './src/DarkModeContext';
import InventoryPage from './src/InventoryPage';
import AppointmentViewer from './src/ViewAppointment';
import BoreholeMaterialsView from './src/Borehole';
import ApprovedClients from './src/ApprovedClients';
import Modal from 'react-native-modal';
import { getDataFromStorage,setDataToStorage,STORAGE_TECH } from './src/DataStorage';
const Stack = createStackNavigator();
 

var id_b;
  function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('technician');
  const navigation = useNavigation();
  const [user,setUser]=useState(null);
  //const [b_id,setBId] = useState([]);


  
   const Login = (email) => {
   
    const {manifest}=Constants;
    const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
    axios.get(''+uri+'/getuseremail/'+email+'', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
      })
    .then(response => {
      // Handle the response data
      setUser(response.data);
      setDataToStorage(STORAGE_TECH,response.data.user_ID);
      // id_b=response.data.user_ID;
       console.log(response.data);
      //  console.log(id_b);

       // handleLoginValidation();
      if (email === response.data.user_Email && password === response.data.user_Password && response.data.user_Type === 'Technician') {
        navigation.navigate('Technician' );
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the requestr
      // console.error('Boss');
      alert('Invalid email or password');
    });
  };

  const handleLoginValidation = () => {
    if (user &&   email === user.user_Email && password === user.user_Password && user.user_Type === 'Technician') {
      navigation.navigate('Technician');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogin = () => {
    Login(email);
  };
  useEffect(() => {
    if (user !== null) {
      handleLoginValidation();
    }
  }, [user]);

  // Log the data after it has been fetched and set
   
  return (
    <View style={styles.container}>
        {/* CMelectric logo */}
 
      <Text style={styles.logo}>CMELECTRIC</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      {/* <View style={styles.inputView}>
        <Picker
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
        >
         <Picker.Item label="Manager" value="manager" />
          <Picker.Item label="Technician" value="technician" />
        </Picker>
      </View> */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
    
  );
}
 
console.log(id_b);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ec2727',
    marginBottom: 40,
  },
  logoImage: {
    // Set the width and height of the image
    width: 100,
    height: 100,
    marginBottom: 20, // Adjust this value as needed to control the space between the image and "CMELECTRIC" text
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#ec2727',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  Insp:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techcontainer: {
    flex: 1, // Make the container take up the entire screen
    flexDirection: 'column', // Vertical layout
    justifyContent: 'flex-start', // Align children at the top
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#888888',
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
});


 const events = []


const TechnicianScreen = ({isSidebarOpen}) => {
      
  // const [events, setEvents] = useState([]);
  // const [tempevents, setTempEvents] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event
  const [events, setEvents] = useState([]);
  const [clienttech_id, setClientTechId] = useState('');

  const fetchData = async () => {
    const storeData = await getDataFromStorage(STORAGE_TECH);
    setClientTechId(storeData);
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    // Fetch events from your database or API here
    async function fetchEvents() {
      try {
        if (clienttech_id) { // Check if clienttech_id is available
          const { manifest } = Constants;
          const uri = 'http://' + manifest.debuggerHost.split(':').shift() + ':8080';
          // alert(clienttech_id)
          const response = await axios.get(`${uri}/gettechcalbookings/` + clienttech_id, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          });
  
          // Format the response data into the required event format
          const formattedEvents = [];
  
          response.data.forEach((user) => {
            const _title = `${user.service} inspection for ${user.user_Name} ${user.user_Surname}\n Address: ${user.address}\n Phone: ${user.user_Phone}`;
            const book = {
              title: _title,
              start: new Date(user.appointmentDate),
              end: new Date(user.appointmentDate),
            };
            formattedEvents.push(book);
  
            user.clienttaskdates.forEach((tdate) => {
              const _ttitle = `${user.service} installation/maintanance for ${user.user_Name} ${user.user_Surname}\n Address: ${user.address}\n Phone: ${user.user_Phone}`;
              const _book = {
                title: _ttitle,
                start: new Date(tdate.clienttaskdate),
                end: new Date(tdate.clienttaskdate),
              };
              formattedEvents.push(_book);
            });
          });
  
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchEvents();
  }, [clienttech_id]);
  

  const CalendarHeader = ({ date }) => {
    // Check if the date is available or provide a default date
    const currentDate = date || new Date();
    const formattedDate = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    // console.log(formattedDate)
    // alert(formattedDate)
    return (
      <Text style={{ textAlign: 'center', margin: 10, fontSize: 20, fontWeight: 'bold' }}>
        {formattedDate}
      </Text>
    );
  };
  const handleEventPress = (event) => {
    // Set the selected event when an event is pressed
    setSelectedEvent(event);
  };

  return (
    <View style={{ flex: 1 }}>
       {/* <View style={{ backgroundColor: 'white', padding: 10 }}>
        <CalendarHeader />
      </View> */}
       {isSidebarOpen &&<TechnicianSidebar />}
      {!isSidebarOpen && <Calendar events={events} headerComponent={CalendarHeader} height={600} mode={'month'}  onPressEvent={handleEventPress} onVisibleMonthsChange={(newVisibleMonths) => {
        if (newVisibleMonths.length > 0) {
          const currentMonth = newVisibleMonths[0];
          const month = currentMonth.getMonth() + 1; // Adding 1 to adjust the month (JavaScript months are 0-based)
          const year = currentMonth.getFullYear();

          // Now, you have the current month and year, you can store it in the state or use it as needed
          console.log(`Current month: ${month}, Year: ${year}`);
        }
      }}/>
      } 
       {selectedEvent && (
        <Modal isVisible={true} style={styles.modal}>
        <View style={styles.modalContent}> 
          <Text>{selectedEvent.title}
          {'\n'}
          </Text>
          {/* <Text>Start: {selectedEvent.start.toString()}</Text>
          <Text>End: {selectedEvent.end.toString()}</Text> */}
         
          <TouchableOpacity style={styles.viewButton} onPress={() => setSelectedEvent(null)}>
            <Text style={styles.viewButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        </Modal>
      )}
    </View>
  );
};


const ViewInfo = () => {
  return (
    <DarkModeProvider>
    <View style={styles.Insp}>
      <CustomerInfoPage/>
    </View>
    </DarkModeProvider>
  );
};
 const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
    return (
     <DarkModeProvider>
    <NavigationContainer>
      <Stack.Navigator > 
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Technician" options={{
                headerRight: () => (
                  <TouchableOpacity style={styles.listItem} onPress={handleToggleSidebar}>
                    <Text style={styles.listLabel}>{isSidebarOpen ? 'X' : '☰'}</Text>
                  </TouchableOpacity>                
                ),
                
         }} >
         {() => <TechnicianScreen isSidebarOpen={isSidebarOpen} />}
         </Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/> 
         <Stack.Screen name="Assigned Appointments"  component={AppointmentViewer}  />
        <Stack.Screen name="Inspection Appointments" component={CustomerList} />
        <Stack.Screen name="Record" component={Inspection} />
        <Stack.Screen name="Information" component={ViewInfo} />
        <Stack.Screen name="Approved Appointments" component={ApprovedClients} />
      </Stack.Navigator>
    </NavigationContainer>
     </DarkModeProvider>
  );
};

export default App;



