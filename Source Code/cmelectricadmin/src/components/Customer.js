import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon, UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/Customer.css';
import axios from 'axios';

const CUSTOMERList = ({ isSidebarOpen }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(null);

  let navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:8080/getallbookings', {
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
  
    const queryStringParams = {
    category: 'electronics',
    brand: 'example_brand',
  };
  const ViewInfo = () => {
    let path = `/cutomer/Information.js`; 
    navigate(path);
  };

  const QuotationStatus = (status,isPaid,time) => {
    
    if(isPaid==='1'){
      return 'Approved'
    }
    else if(isPaid==0){
      // switch (status) {
      //   case null:
      //     return 'Waiting for Inspection';
      //   case '0':
      //     return 'Rejected';
      //   default:
      //     return 'Created';
      // }
      if(time===null && status===null){
        return 'Waiting for Inspection';
      }
      else if(status==='0' && time!==null){
        return 'Rejected';
      }
      else if (status===null && time!==null) {
      return 'Not Created'
    }
      else if(status!==null && status!==0 && time!==null){
        return 'Created';
      }
    }
    
    
    
  };

  const filteredUsers = users.filter((user) =>
    user.book_ID.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={`Customer ${!isSidebarOpen ? 'Customer--screen-minimized' : ''}`}>
      <div className="heading">
          <h1>Cutomers</h1>
      </div>
      <input className="Customer_Search" type="text" placeholder="Search Customers" value={searchTerm} onChange={handleSearch} />
      <table className='Customer_Table'>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Customer Name</th>
            <th>Date Booked</th>
            <th>Service</th>
            <th>Quotation</th>
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
                <td>{QuotationStatus(user.quotation,user.paid,user.time)}</td>
                <td>{user.complete!="0" ? 'Complete' : 'Incomplete'}</td>
                <td>
                <Link to={{ pathname: '/customer/information', search: `?id=${user.book_ID}` }}><button className='View Information'>View</button></Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CUSTOMERList;
