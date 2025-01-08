import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route} from "react-router-dom";
import {MdInventory} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../../assets/css/Customer.css';
import axios from 'axios';

const Information = ({isSidebarOpen}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing query string parameters
  const id = queryParams.get('id');

  //Customer
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/getuserbooking/'+id, {
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
  


  // Function to handle the modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

//   const filteredUsers = users.filter((user) =>
//     user.user_Password.toLowerCase().includes(searchTerm.toLowerCase()),
//   );
    return(
      <div className={`Technician ${!isSidebarOpen ? 'Technician--screen-minimized' : ''}`}>
      
      <div className='heading'>
        <h1>Customer</h1>
        <h2>Customer Details</h2>
          <div>
            <h3>Name & Surname: {customers.user_Name+" "+customers.user_Surname}</h3>
            <h3>Email: {customers.user_Email}</h3>
            <h3>Phone: {customers.user_Phone}</h3>
            <h3>Service: {customers.service}</h3>
          </div>
      </div>
      
      <div className="heading">
          <h2>Appointments</h2>
      </div>
      <div class="detailed"> 

        <div class="detailedbooking" style={{background: 'white'}} >

        
        <h5>Booking reference :{customers.book_ID}</h5>
        <h5>Service :{customers.service}</h5>
        <h5>Booking Date :{customers.appointmentDate}</h5>
        <h5>Assigned Technician :{customers.technician!=null ? customers.technician : 'Not Assigned'}</h5>
        <h5>Progress :{customers.complete!='0' ? 'Complete' : 'Incomplete'}</h5>
        <h5>Payment :{customers.complete!='0' ? 'Paid' : 'Not Paid'}</h5>
        </div> 

        <div class="detailedbooking" style={{background: 'white'}} >

            <div class="detailed">
            <Link to={{ pathname: '/customer/information/quotation', search: `?id=${id}` }}><button  class="btn-book-a-table" style={{border:'none',padding:'10px'}} type="submit">Quotation</button></Link>
            </div>
        </div> 
        </div>
      <br></br>
      </div>
      
    );
};
export default Information;  