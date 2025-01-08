import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/Messages.css';
import axios from 'axios';


const Feedback = ({isSidebarOpen}) => {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [MessageData,setMessageData]=useState([]);
  const [customers, setCustomers] = useState(null);
  const [showModal, setShowModal] = useState(false);

 useEffect(() => {
  axios.get('http://localhost:8080/getallbookings', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(response => {
     let cust=[]
     response.data.forEach(user=>{
       if(user.feedback!==null){
        cust.push(user)
       }
     });
      setCustomers(cust);
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
   const handleShowModal = (feed) => {
    console.log('Showing modal');
    setShowModal(true);
    setMessageData(feed)
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setMessageData(null)
  };

 const filteredUsers = users.filter((user) =>
   user.book_ID.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div className={`Messages ${!isSidebarOpen ? 'Messages--screen-minimized' : ''}`}>
  
     <input ClassName="Query_Search" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
     <table ClassName='Query_Table'>
       <thead>
         <tr>
         <th>Booking Reference</th>
           <th>Customer Name</th>
           <th>Feedback</th>
         </tr>
       </thead>
       
       <tbody>
         {
           filteredUsers.map((user) => (
           <tr key={user.book_ID}>
             <td>{user.book_ID}</td>
             <td>{user.user_Name+" "+user.user_Surname}</td>
             <td>
             <button onClick={()=>handleShowModal(user.feedback)} className='Query'>View Feedback</button>          
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
                    <h2 class="form-title">Feedback</h2>
                    <div class="form-group">
                        <textarea type="text" class="form-input" name="feedback" id="feedbackid" rows='7' value={MessageData} readOnly></textarea>
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

export default Feedback;