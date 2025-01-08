import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/Messages.css';
import axios from 'axios';



const QueryList = ({isSidebarOpen}) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [MessageData,setMessageData]=useState([]);


// Simulated user data
// const MessageData = [
//     { id: 1, name: 'John Kani', dateAdded: '2022-01-01', userType: 'Admin', active: true },
//     { id: 2, name: 'William Smith', dateAdded: '2022-02-01', userType: 'Regular', active: false },
//     { id: 3, name: 'Alica Keys', dateAdded: '2022-03-01', userType: 'Regular', active: true },
//    // Add more users as needed
//  ];

 useEffect(() => {
  axios.get('http://localhost:8080/getqueries', {
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
}, []);

//  useEffect(() => {
//    // Simulate fetching user data from an API
//    setUsers(MessageData);
//  }, []);

 const handleSearch = (e) => {
   setSearchTerm(e.target.value);
 };

 const ViewInfo=(id)=>{
   
 };

 const selectUser=(userid)=>{

 };

 const filteredUsers = users.filter((user) =>
   user.user_Name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div className={`Messages ${!isSidebarOpen ? 'Messages--screen-minimized' : ''}`}>
  
     <input ClassName="Query_Search" type="text" placeholder="Search Query" value={searchTerm} onChange={handleSearch} />
     <table ClassName='Query_Table'>
       <thead>
         <tr> 
           <th>Customer Name</th>
           <th>Query Issued</th>
           <th>Query</th>
         </tr>
       </thead>
       
       <tbody>
         {
           filteredUsers.map((user) => (
           <tr key={user.query_ID}>
             <td>{user.user_Name}</td>
             <td>{user.date}</td>

             <td>
             <Link to={{ pathname: '/query/Viewquery', search: `?id=${user.query_ID}` }}><button className='Query'>View Query</button></Link>            
              </td>
           </tr>
         ))}
       </tbody>
     </table>

   </div>
 );
};

export default QueryList;