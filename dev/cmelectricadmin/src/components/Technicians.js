import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {VscCalendar} from 'react-icons/vsc'
import '../assets/css/Technicians.css';
import '../assets/css/style.css';
import { useAlert } from 'react-alert';
import axios from 'axios';

const TechnicianList = ({isSidebarOpen}) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAvailable, setSearchAvailable] = useState('');
  const [technicians, setTechnicians] = useState(null);
  const [availabletechnicians, setAvailableTechnicians] = useState([]);
  const [availabletechs, setAvailableTechs] = useState(null);
  const [stock, setStock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal,setShowUpdateModal]=useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [item, setItem] = useState({
    user_Name: '',
    user_Surname: '',
    user_Email: '',
    user_Address: '',
    user_Phone: ''
  });
  const alert=useAlert()
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); 
  

  const onChange = (date) => {
    const formattedDate = formatDate(date); // Format the selected date
    setSelectedDate(formattedDate); // Update the selectedDate state
  };

  // Helper function to format date as yyyy-mm-dd
  

  const updateUser=(event,ID)=>
  {
    event.preventDefault()
    axios.put('http://localhost:8080/updateuser/'+ID,
    {
      user_Name: ''+document.getElementById("upname").value+'',
      user_Surname: ''+document.getElementById("upsurname").value+'',
      user_Email: ''+document.getElementById("upemail").value+'',
      user_Address: ''+document.getElementById("upaddress").value+'',
      user_Phone: ''+document.getElementById("upphone").value+''
    }
    )
    .then(response => {
      if(response.data==true){
        alert.show('Technician details successfully updated')
      }
      else{
        alert.show('Server error: Technician details not updated')
      }
      
    })
    .catch(error => {
      alert.show('Server error: Technician details not updated')
    });
  }
  const handleShowUpdateModal = (event,ID,userName,userSurname,userEmail,userAddress,userPhone) => {
    event.preventDefault()
    setStock(ID);
    // let dat=[itemname,itembrand,itemcapacity,itemquantity,itemprice]

    setItem(
      {
        user_Name: ''+userName+'',
        user_Surname: ''+userSurname+'',
        user_Email: ''+userEmail+'',
        user_Address: ''+userAddress+'',
        user_Phone: ''+userPhone+''
      }
      ); 
        console.log(stock);
        console.log('Showing modal');
        setShowUpdateModal(true); 
        
        
  };
  useEffect(() => {
    if(showUpdateModal==true){
      document.getElementById('upname').value=item.user_Name
      document.getElementById('upsurname').value=item.user_Surname
      document.getElementById('upemail').value=item.user_Email
      document.getElementById('upaddress').value=item.user_Address
      document.getElementById('upphone').value=item.user_Phone
    }
  }, [showUpdateModal]);
  useEffect(() => {
    if(showCalendarModal==true){
      axios.get('http://localhost:8080/getavailabletechnicians/'+selectedDate, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setAvailableTechs(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
    }
  }, [showCalendarModal,availabletechs]);
  // Function to handle the modal close
  useEffect(() => {
    if (availabletechs) {
      setAvailableTechnicians(availabletechs);
    }
  }, [availabletechs]);

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/gettechnicians', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setTechnicians(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [technicians]);

  useEffect(() => {
    if (technicians) {
      setUsers(technicians);
    }
  }, [technicians]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchAvailable = (e) => {
    setSearchAvailable(e.target.value);
  };

   // Function to handle the modal show
   const handleShowModal = () => {
    console.log('Showing modal');
    setShowModal(true);
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowCalendarModal = () => {
    console.log('Showing modal');
    setShowCalendarModal(true);
  };

  // Function to handle the modal close
  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };

  const deleteTechnician=(ID)=>
  {
    axios.delete('http://localhost:8080/deletetechnician/'+ID)
    .then(response => {
      if(response.data==true){
        alert.show('Technican successfully removed')
      }
      else{
        alert.show('Failed: Technican still has incomplete appointments')
      }
      
    })
    .catch(error => {
      alert.show('Technician not removed')
    });
  }
  //Add technician
  const submitBookForm=(event)=>
  {
      event.preventDefault()
      axios.post('http://localhost:8080/addtechnician', {
      user_Name: ''+document.getElementById("name").value+'',
      user_Surname: ''+document.getElementById("surname").value+'',
      user_Email: ''+document.getElementById("email").value+'',
      user_Address: ''+document.getElementById("address").value+'',
      user_Type: 'Technician',
      user_Phone: ''+document.getElementById("phone").value+'',
      service:''+document.getElementById("service").value+''
      })
      .then(response=>{
          console.log(response)
          setTechnicians((prevTechnicians) => [...prevTechnicians, response.data]);
          alert.show("Technician successfully added.");
      }).catch(error => {
          if (error.response.status === 405) {
            // Handle 405 error
            console.log("405 Error: Method not allowed.");
          };
      }) 
  }
 //Calendar

  const filteredUsers = users.filter((user) =>
    user.user_Name && user.user_Name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredAvailable = availabletechnicians.filter((user) =>
    user.service && user.service.toLowerCase().includes(searchAvailable.toLowerCase()),
  );

  return (
    <div className={`Technician ${!isSidebarOpen ? 'Technician--screen-minimized' : ''}`}>
      <div className="heading">
          <h1>Technicians</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className="showcalendar">
      <button variant="secondary" className="adduserbtn" onClick={handleShowCalendarModal}>
          <VscCalendar className="iconadd" /> Task Calendar
      </button>
     </div>
     <div className="adduser">
      <button variant="secondary" className="adduserbtn" onClick={handleShowModal}>
          <UserAddIcon className="iconadd" /> Add Technician
      </button>
     </div>
      </div>
      <input ClassName="Technician_Search" type="text" placeholder="Search technicians" value={searchTerm} onChange={handleSearch} />
      <table ClassName='Technician_Table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Added</th>
            <th>Speciality</th>
            <th>Tasks</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.user_ID}>
              <td>{user.user_Name+' '+user.user_Surname}</td>
              <td>{user.dateAdded}</td>
              <td>{user.service}</td>
              <td>
              <Link to={{ pathname: '/technician/task', search: `?id=${user.user_ID}` }}><button ClassName='Technician_View'>View</button></Link>
               
              </td>
              <td>  
                <button ClassName='Technician_Delete' onClick={(event) => handleShowUpdateModal(event,user.user_ID,user.user_Name,user.user_Surname,user.user_Email,user.user_Address,user.user_Phone)}>Update</button>
              </td>
              <td>
                <button ClassName='Technician_Delete' onClick={() => deleteTechnician(user.user_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
         <Modal className='ModalBackdrop1' show={showModal} onHide={handleCloseModal} dialog>
      <Modal.Header className='Modalheader'>
        <a onClick={handleCloseModal} className='ModalCloseButton'>X</a>
      </Modal.Header>
      <Modal.Body className='Modalbody' >
        <div className='Modelbodydiv'>
        <div class="main" id="bookformid" >

        <section class="signup">
        <div class="container">
            <div class="signup-content">
             
                <form method="POST" id="bookform" class="signup-form">
                  <span><ion-icon name="close-outline" style={{top:0, right: '10px', width: '30px', height: '30px', position: 'absolute'}} onclick="closeBookForm()"></ion-icon></span> 
                    <h2 class="form-title">Add Technician</h2>
                    <div class="form-group">
                        <input type="text" class="form-input" name="name" id="name" placeholder="Your Name" required/>
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-input" name="surname" id="surname" placeholder="Your Surname" required/>
                  </div>
                    <div class="form-group">
                        <input type="email" class="form-input" name="email" id="email" placeholder="Your Email" required/>
                    </div>
                    <div class="form-group">
                      <input type="number" class="form-input" name="phone" id="phone" placeholder="Your phone number" required/>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-input" name="Address" id="address" placeholder="Your address" required/>
                </div>
                <div class="form-group" >
                      <select class="form-input" id="service">
                        <option value="" disabled="disabled" selected="selected" >Select a service</option>
                        <option value="COC">COC</option>
                        <option value="Borehole motors">Borehole motors</option>
                        <option value="Car lifts">Car lifts</option>
                        <option value="Generator">Generator</option>
                        <option value="Solar system">Solar system</option>
                        <option value="House wiring"> House wiring</option>
                        <option value="Air Conditioner">Air Conditioner</option>
                        <option value="Electric fence">Electric fence</option>
                    </select>
  
                  </div>
                {/* <div class="form-group">
                  <input type="datetime-local" class="form-input" name="date" id="date" required/>
              </div> */}
                    <div class="form-group">
                        <input type="submit" name="submit" id="submit" class="form-submit" value="Add" onClick={(event) => submitBookForm(event)} />
                    </div>
                </form>
            </div>
        </div>
    </section>
      </div>
     </div>
       
      </Modal.Body>
      <Modal.Footer className='Modalfooter'>
        
      </Modal.Footer>
    </Modal>
      </div>
      <div>
         <Modal className='ModalBackdrop1' show={showUpdateModal} onHide={handleCloseUpdateModal} dialog>
      <Modal.Header className='Modalheader'>
        <a onClick={handleCloseUpdateModal} className='ModalCloseButton'>X</a>
      </Modal.Header>
      <Modal.Body className='Modalbody' >
        <div className='Modelbodydiv'>
        <div class="main" id="bookformid" >

        <section class="signup">
        <div class="container">
            <div class="signup-content">
             
                <form method="POST" id="bookform" class="signup-form">
                  <span><ion-icon name="close-outline" style={{top:0, right: '10px', width: '30px', height: '30px', position: 'absolute'}} onclick="closeBookForm()"></ion-icon></span> 
                    <h2 class="form-title">Update Technician Details</h2>
                    <div class="form-group">
                        <label for="upname"><b>Name</b>:</label>
                        <input type="text" class="form-input" name="name" id="upname" placeholder="Your Name" required/>
                    </div>
                    <div class="form-group">
                    <label for="upsurname"><b>Surname</b>:</label>
                      <input type="text" class="form-input" name="surname" id="upsurname" placeholder="Your Surname" required/>
                  </div>
                    <div class="form-group">
                    <label for="upemail"><b>Email</b>:</label>
                        <input type="email" class="form-input" name="email" id="upemail" placeholder="Your Email" required/>
                    </div>
                    <div class="form-group">
                    <label for="upphone"><b>Phone</b>:</label>
                      <input type="number" class="form-input" name="phone" id="upphone" placeholder="Your phone number" required/>
                  </div>
                  <div class="form-group">
                  <label for="upaddress"><b>Address</b>:</label>
                    <input type="text" class="form-input" name="Address" id="upaddress" placeholder="Your address" required/>
                </div>
                <div class="form-group">
                    <input type="submit" name="submit" id="upsubmit" class="form-submit" value="Update" onClick={(event) => updateUser(event,stock)} />
                </div>
                </form>
            </div>
        </div>
    </section>
      </div>
     </div>
       
      </Modal.Body>
      <Modal.Footer className='Modalfooter'>
        
      </Modal.Footer>
    </Modal>
      </div>

      <div>
         <Modal className='ModalBackdrop1' show={showCalendarModal} onHide={handleCloseCalendarModal} dialog>
      <Modal.Header className='Modalheader'>
        <a onClick={handleCloseCalendarModal} className='ModalCloseButton'>X</a>
      </Modal.Header>
      <Modal.Body className='Modalbody' >
        <div className='Modelbodydiv' style={{overflow:'auto'}}>
        <div class="main" id="bookformid" >

        <section class="signup">
        <div class="container">
            <div class="signup-content">
             
                <form method="POST" id="bookform" class="signup-form">
                  <span><ion-icon name="close-outline" style={{top:0, right: '10px', width: '30px', height: '30px', position: 'absolute'}} onclick="closeBookForm()"></ion-icon></span> 
                    <h2 class="form-title">Available Technicians</h2>
                    <div>
                    <div class="form-group">
                        {/* <input type="date" class="form-input" name="name" id="upname" placeholder="Your Name" required/> */}
                        <div className='calendar-container' style={{ maxHeight:'30%'}} >
                          <Calendar onChange={onChange} value={new Date(selectedDate)}/>
                        </div>
                    </div>
                    <div class="form-group">
                      <input ClassName="Technician_Search" type="text" placeholder="Search technicians" value={searchAvailable} onChange={handleSearchAvailable} />
                      <table ClassName='Technician_Table'>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Speciality</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAvailable.map((user) => (
                            <tr key={user.user_ID}>
                              <td>{user.user_Name+' '+user.user_Surname}</td>
                              <td>{user.service}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
      </div>
     </div>
       
      </Modal.Body>
      <Modal.Footer className='Modalfooter'>
        
      </Modal.Footer>
    </Modal>
      </div>

    </div>
  );
};

export default TechnicianList;

