import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route} from "react-router-dom";
import {MdInventory} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../../assets/css/Technicians.css';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Viewquery = ({isSidebarOpen}) => {
  const alert=useAlert()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing query string parameters
  const id = queryParams.get('id');

  //Customer
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/getquery/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    if (customers) {
      setUsers(customers);
    }
  }, [customers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  //Response
  const respond=(event)=>{
    event.preventDefault();

    const message = responseMessage;
    axios.put(`http://localhost:8080/postresponse/${id}`, message, {
      headers: {
        'Content-Type': 'application/text',
      },
    })
      .then((response) => {
        // Handle success
        alert.show('Response successfully sent');
        // You might want to show a success message or perform other actions
      })
      .catch((error) => {
        // Handle error
        console.error('Error');
        // You might want to show an error message or perform other error handling
      });

  };

//   const filteredUsers = users.filter((user) =>
//     user.user_Password.toLowerCase().includes(searchTerm.toLowerCase()),
//   );
    return(
      <div>
      <div className={`Technician ${!isSidebarOpen ? 'Technician--screen-minimized' : ''}`}>
      
      <div className='heading'>
        <h1>Query</h1>   
      </div>
      <div className="heading" style={{padding:'0'}}>
         <div>
            <h3>Name: {customers.user_Name}</h3>
            <h3>Email: {customers.user_Email}</h3>
          </div>
          <h3>Subject: {customers.subject}</h3>
          {/* <h3>Borehole</h3> */}
          <h2>Message:</h2>
          <textarea  rows="15" cols="120" value={customers.message} readOnly>
          </textarea>
          <div >
             <Button onClick={handleShowModal}>Respond</Button>
          </div>
      </div>
      <br></br>

      </div>
      <div>
      <Modal className='ModalBackdrop1' show={showModal} onHide={handleCloseModal} dialog>
      <Modal.Header className='Modalheader'>
        <a onClick={handleCloseModal} className='ModalCloseButton'>X</a>
      </Modal.Header>
      <br></br>
      <br></br>
      <Modal.Body className='Modalbody' >
        <div className='Modelbodydiv'>
        <div class="main" id="bookformid" >

        <section class="signup">
        <div class="container">
            <div class="signup-content">
             
                <form method="POST" id="bookform" class="signup-form">
                  <span><ion-icon name="close-outline" style={{top:0, right: '10px', width: '30px', height: '30px', position: 'absolute'}} onclick="closeBookForm()"></ion-icon></span> 
                    <h2 class="form-title">Response</h2>
                    <div class="form-group">
                        <textarea type="text" class="form-input" name="response" id="response" placeholder="Your message" rows="13" value={responseMessage} onChange={(e) => setResponseMessage(e.target.value)} required></textarea>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="submit" id="submit" class="form-submit" value="Send" onClick={(event) => respond(event)}/>
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
export default Viewquery;  