import React, { useState, useEffect } from 'react';
import {MdInventory} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../../assets/css/Inventory.css';
import '../../assets/css/Borehole.css';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Solar = ({isSidebarOpen, Inventorypage}) => {
    const alert=useAlert()
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [stock, setStock] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal,setShowUpdateModal]=useState(false)
    const [item, setItem] = useState({
      item_Name: '',
      item_Brand: '',
      item_Capacity: '', 
      item_Quantity: '',
      item_Price: ''
    });
    
  // ];
  const deletestock=(ID)=>
  {
    axios.put('http://localhost:8080/deletestock/'+ID)
    .then(response => {
      if(response.data==true){
        alert.show('Item successfully removed')
      }
      else{
        alert.show('Server error: Item not removed')
      }
      
    })
    .catch(error => {
      alert.show('Server error: Item not removed')
    });
  }
  const updatestock=(event,ID)=>
  {
    event.preventDefault()
    axios.put('http://localhost:8080/updatestock/'+ID,
    {
      item_Name: ''+document.getElementById("upitemname").value+'',
      item_Brand: ''+document.getElementById("upitembrand").value+'',
      item_Capacity: ''+document.getElementById("upitemcapacity").value+'',
      item_Quantity: ''+document.getElementById("upitemquantity").value+'',
      item_Price: ''+document.getElementById("upitemprice").value+''
    }
    )
    .then(response => {
      if(response.data==true){
        alert.show('Item successfully updated')
      }
      else{
        alert.show('Server error: Item not updated')
      }
      
    })
    .catch(error => {
      alert.show('Server error: Item not updated')
    });
  }
  const handleShowUpdateModal = (event,ID,itemname,itembrand,itemcapacity,itemquantity,itemprice) => {
    event.preventDefault()
    setStock(ID);
    // let dat=[itemname,itembrand,itemcapacity,itemquantity,itemprice]

    setItem(
      {
        item_Name: ''+itemname+'',
        item_Brand: ''+itembrand+'',
        item_Capacity: ''+itemcapacity+'',
        item_Quantity: ''+itemquantity+'',
        item_Price: ''+itemprice+''
      }
      ); 
        console.log(stock);
        console.log('Showing modal');
        setShowUpdateModal(true); 
        
        
  };
  useEffect(() => {
    if(showUpdateModal==true){
      document.getElementById('upitemname').value=item.item_Name
      document.getElementById('upitembrand').value=item.item_Brand
      document.getElementById('upitemcapacity').value=item.item_Capacity
      document.getElementById('upitemquantity').value=item.item_Quantity
      document.getElementById('upitemprice').value=item.item_Price
    }
  }, [showUpdateModal]);
  // Function to handle the modal close
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
    
  // ];
  useEffect(() => {
    // Simulate fetching user data from an API
    axios.get('http://localhost:8080/getstock/Solar system', {
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

  const selectUser=(userid)=>{

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

  const submitBookForm=(event)=>
  {
      event.preventDefault()
      axios.post('http://localhost:8080/addstock', {
      item_Category: 'Solar system',
      item_Name: ''+document.getElementById("itemname").value+'',
      item_Brand: ''+document.getElementById("itembrand").value+'',
      item_Capacity: ''+document.getElementById("itemcapacity").value+'',
      item_Quantity: ''+document.getElementById("itemquantity").value+'',
      item_Price: ''+document.getElementById("itemprice").value+''
      })
      .then(response=>{
          console.log(response)
          alert.show("Item Added");
      }).catch(error => {
          if (error.response.status === 405) {
            // Handle 405 error
            console.log("405 Error: Method not allowed.");
          };
      })
      
  }
  const filteredUsers = users.filter((user) =>
    user.item_Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return(
         
        <div className={`Inventory ${!isSidebarOpen ? 'Inventory--screen-minimized' : ''}`}>
            <div className="heading">
          <h1>Solar System</h1>
      </div>
     <div className="adduser">
      <button variant="secondary" className="adduserbtn" onClick={handleShowModal}>
          <UserAddIcon className="iconadd" /> Add Stock
      </button>
     </div>
      <input ClassName="Technician_Search" type="text" placeholder="Search Item Name" value={searchTerm} onChange={handleSearch} />
      <table ClassName='Technician_Table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Brand</th>
            <th>Capacity</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.item_Name}</td>
              <td>{user.item_Brand}</td>
              <td>{user.item_Capacity}</td>
              <td>{user.item_Quantity}</td>
              <td>R{user.item_Price}</td>
              <td>
                <button ClassName='Technician_Delete' onClick={(event) => handleShowUpdateModal(event,user.item_ID,user.item_Name,user.item_Brand,user.item_Capacity,user.item_Quantity,user.item_Price)}>Update</button>
              </td>
              <td>
                <button ClassName='Technician_Delete' onClick={() => deletestock(user.item_ID)}>Delete</button>
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
                    <h2 class="form-title">Add Item</h2>
                    <div class="form-group">
                      <input type="text" class="form-input" name="itemname" id="itemname" placeholder="Item name" required/>
                  </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="itembrand" id="itembrand" placeholder="Brand" required/>
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-input" name="itemcapacity" id="itemcapacity" placeholder="Capacity" required/>
                  </div>
                  <div class="form-group">
                    <input type="number" class="form-input" name="itemquantity" id="itemquantity" placeholder="Quantity" required/>
                </div>
                <div class="form-group">
                    <input type="number" class="form-input" name="itemprice" id="itemprice" placeholder="Price" required/>
                </div>
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
                    <h2 class="form-title">Update Item</h2>
                    
                    <div class="form-group">
                      <label for="upitemname"><b>Item name</b>:</label>
                      <input type="text" class="form-input" name="itemname" id="upitemname" placeholder="Item name" required/>
                  </div>
                    <div class="form-group">
                    <label for="upitembrand"><b>Brand</b>:</label>
                        <input type="text" class="form-input" name="itembrand" id="upitembrand" placeholder="Brand" required/>
                    </div>
                    <div class="form-group">
                    <label for="upitemcapacity"><b>Capacity</b>:</label>
                      <input type="text" class="form-input" name="itemcapacity" id="upitemcapacity" placeholder="Capacity" required/>
                  </div>
                  <div class="form-group">
                  <label for="upitemquantity"><b>Quantity</b>:</label>
                    <input type="number" class="form-input" name="itemquantity" id="upitemquantity" placeholder="Quantity" required/>
                </div>
                <div class="form-group">
                <label for="upitemprice"><b>Price</b>:</label>
                    <input type="number" class="form-input" name="itemprice" id="upitemprice" placeholder="Price" required/>
                </div>

                <div class="form-group">
                    <input type="submit" name="submit" id="upsubmit" class="form-submit" value="Update" onClick={(event) => updatestock(event,stock)} />
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
export default  Solar