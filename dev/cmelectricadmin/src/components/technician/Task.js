import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route} from "react-router-dom";
import {MdInventory} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../../assets/css/Technicians.css';
// import '../../assets/css/Customer.css';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Task = ({isSidebarOpen}) => {
  const alert=useAlert()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing query string parameters
  const id = queryParams.get('id');

  //Customer
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(null);
  const [technician,setTechnician]=useState({});
  const [showModal, setShowModal] = useState(false);
  const [unassignedclient,setUnassignedclient]=useState(null)
  const [clients,setClients]=useState([])
  

  useEffect(() => {
    axios.get('http://localhost:8080/getassignedbookings/'+id, {
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
  }, [customers]);
  useEffect(() => {
    axios.get('http://localhost:8080/gettechnician/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setTechnician(response.data);
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

  //Modal Data
  useEffect(() => {
    axios.get('http://localhost:8080/getunassignedbookings', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setUnassignedclient(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    if (unassignedclient) {
      setClients(unassignedclient);
    }
  }, [unassignedclient]);

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
  const filteredUsers = users.filter((user) =>
    user.book_ID.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredUsers1 = users.filter((user) =>
    user.book_ID.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const Assign=()=>{
    var bookid=(document.getElementById('service').value).split(' ')
    axios.put('http://localhost:8080/assigntech/'+bookid[0],id ,{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        alert.show("Customer Assigned")
      })
      .catch(error => {
        alert.show(error.message);
      });
  }
  
    return(
      <div>
      <div className={`Technician ${!isSidebarOpen ? 'Technician--screen-minimized' : ''}`}>
      
      <div className='heading'>
        <h1>Technician</h1>
        <h2>Employee Details</h2>
          <div>
            <h3>Name & Surname: {technician.user_Name+" "+technician.user_Surname}</h3>
            <h3>Email: {technician.user_Email}</h3>
            <h3>Phone: {technician.user_Phone}</h3>
            <h3>Service: {technician.service}</h3>
          </div>
      </div>
      
      <div className="heading">
          <h2>Appointments</h2>
      </div>
      <input className="Customer_Search" type="text" placeholder="Search Customers" value={searchTerm} onChange={handleSearch} />
      <table className='Customer_Table'>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Customer Name</th>
            <th>Date Booked</th>
            <th>Service</th>
            <th>Progress</th>
            <th>View Information</th>
          </tr>
        </thead>

        <tbody>
          {
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.book_ID}</td>
                <td>{user.user_Name+' '+user.user_Surname}</td>
                <td>{user.appointmentDate}</td>
                <td>{user.service}</td>
                <td>{user.complete!="0" ? 'Complete' : 'Incomplete'}</td>
                <td>
                <Link to={{ pathname: '/customer/information', search: `?id=${user.book_ID}` }}><button className='View Information'>View</button></Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
      <div className='heading'>
      <Button onClick={handleShowModal}>Assign New task</Button>
      </div>

      </div>
      <div>
         <Modal className='ModalBackdrop' show={showModal} onHide={handleCloseModal} dialog>
      <Modal.Header className='Modalheader'>
      <a onClick={handleCloseModal} className='ModalCloseButton'>X</a>
        {/* <Modal.Title>Assign Task</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className='Modalbody' >
        <div className='Modelbodydiv'>
          <h2>Assign Task</h2>
          <br></br>
          Select Task:
          {/* <h3>Name & Surname: {technician.user_Name + ' ' + technician.user_Surname}</h3>
          <h3>Email: {technician.user_Email}</h3>
          <h3>Phone: {technician.user_Phone}</h3>
          <h3>Service: {technician.service}</h3> */}
        </div>
        <div className='Modelbodydiv'>
        <table className='pCustomer_Table'>
        <thead>
          <tr>
            <th >Reference</th>
            <th>Customer Name</th>
            <th>Date Booked</th>
            <th>Service</th>
            <th>Progress</th>
          </tr>
        </thead>
        </table>
        <table className='pCustomer_Table'>
        <thread>
        <select id='service'>
          {
            clients.map((client) => (
              <option>
                <tr key={client.Book_ID}>
                <th >{client.book_ID+'    '}</th>
                <th>{client.user_Name+' '+client.user_Surname+'   '}</th>
                <th>{client.appointmentDate+'    '}</th>
                <th>{client.service+'     '}</th>
                <th>{client.complete!="0" ? 'Complete' : 'Incomplete       '}</th>
                </tr>
              </option>
            ))}
          </select>
        </thread>
        
      </table>
        </div>
      </Modal.Body>
      <Modal.Footer className='Modalfooter'>
        <Button onClick={Assign} >Assign</Button>
      </Modal.Footer>
    </Modal>
      </div>
      </div>
      
    );
};
export default Task;  