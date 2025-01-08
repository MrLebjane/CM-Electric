import React, { useState, useEffect } from 'react';
import {MdInventory} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/Inventory.css';
import '../assets/css/Borehole.css';
// import '../assets/css/Service.css';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Services = ({isSidebarOpen, Inventorypage}) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [stock, setStock] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal,setShowUpdateModal]=useState(false)
    const alert=useAlert()

    const updateService=(event,ID,_service_Fee)=>
    {
      event.preventDefault()
      axios.put('http://localhost:8080/updateservice/'+ID,
      {
        service_Fee:''+_service_Fee+''
      })
      .then(response => {
        if(response.data==true){
          alert.show('Services fee updated')
        }
        else{
          alert.show('Failed: Service fee not updated')
        }
        
      })
      .catch(error => {
        alert.show('Failed: Service fee not updated')
      });
    }
  useEffect(() => {
    // Simulate fetching user data from an API
    
    axios.get('http://localhost:8080/getservices', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteUser=(id)=>{
    
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
  const handleShowUpdateModal = (ID) => {
    setStock(ID)
    console.log('Showing modal');
    setShowUpdateModal(true);
  };

  // Function to handle the modal close
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const submitBookForm=(event)=>
  {
      event.preventDefault()
      axios.post('http://localhost:8080/addservices', {
      service_Type: ''+document.getElementById("itemname").value+'',
      service_Fee: ''+document.getElementById("itemprice").value+''
      })
      .then(response=>{
          console.log(response)
          // setStock((prevStock) => [...prevStock, response.data]);
          alert.show("Service Added");
      }).catch(error => {
          if (error.response.status === 405) {
            // Handle 405 error
            console.log("405 Error: Method not allowed.");
          };
      })
      
  }

  const filteredUsers = users.filter((user) =>
    user.service_Type.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return(
         
        <div className={`Inventory ${!isSidebarOpen ? 'Inventory--screen-minimized' : ''}`}>
            <div className="heading">
          <h1>Services</h1>
      </div>
     <div className="adduser">
      <button variant="secondary" className="adduserbtn" onClick={handleShowModal}>
          <UserAddIcon className="iconadd" /> Add Service
      </button>
     </div>
      <input ClassName="Technician_Search" type="text" placeholder="Search Service" value={searchTerm} onChange={handleSearch} />
      <table ClassName='Technician_Table'>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Service Type</th>
            <th>Hourly Fee</th>
            <th>Update</th>
           </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
             
              <td>{user.service_ID}</td>
              <td>{user.service_Type}</td>
              <td>R{user.service_Fee}</td>
              <td>
                <button ClassName='Technician_Delete' onClick={() => handleShowUpdateModal(user.service_ID)}>Update</button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      <div>
         <Modal className='ModalBackdrop1' style={{maxHeight:'300px',top:"20%",left:'35%'}} show={showModal} onHide={handleCloseModal} dialog>
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
                    <h2 class="form-title">Add Service</h2>
                    <div class="form-group">
                      <input type="text" class="form-input" name="itemname" id="itemname" placeholder="Service name" required/>
                  </div>
                <div class="form-group">
                    <input type="number" class="form-input" name="itemprice" id="itemprice" placeholder="Hourly Rate" required/>
                </div>
                <div class="form-group">
                    <input type="submit" name="submit" id="submit" class="form-submit" value="Add Service" onClick={(event) => submitBookForm(event)} />
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
         <Modal className='ModalBackdrop1' style={{maxHeight:'300px',top:"20%",left:'35%'}} show={showUpdateModal} onHide={handleCloseUpdateModal} dialog>
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
                    <h2 class="form-title">Update Service</h2>
                    
                <div class="form-group">
                    <input type="number" class="form-input" name="_servicefee" id="_servicefee" placeholder="Hourly Rate" required/>
                </div>
                <br></br>
                <div class="form-group">
                    <input type="submit" name="submit" id="submit" class="form-submit" value="Update" onClick={(event) => updateService(event,stock,document.getElementById('_servicefee').value)} />
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
}
export default  Services