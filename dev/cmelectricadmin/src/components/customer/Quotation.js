import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../../assets/css/Customer.css';
import '../../assets/css/quotation.css';
import Logo from '../../assets/img/logo.jpeg'
import { useAlert } from 'react-alert';
import axios from 'axios';

const Quotation = ({isSidebarOpen}) => {
  const alert=useAlert()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing query string parameters
  const id = queryParams.get('id');
  
  const [users, setUsers] = useState([]);
  const [items,setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quotation, setQuotation] = useState(null);
  const [subtotal,setSubtotal]=useState(null);
  const [QProducts,setQProducts]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/getuserbooking/'+id, {
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

  useEffect(() => {
    axios.get('http://localhost:8080/getclientstock/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setQuotation(response.data);
        // console.log(response.data);
        let _subtotal=0;
        response.data.forEach(user=>{
          _subtotal+=user.item_Price*user.item_Quantity
        });
        console.log(_subtotal)
        setSubtotal(_subtotal)
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (quotation) {
      setItems(quotation);
      let allQP = [];
      quotation.forEach((user) => {
        let _qp = {
          product_name: '' + user.item_Name + '',
          product_brand: '' + user.item_Brand + '',
          product_capacity: '' + user.item_Capacity + '',
          quantity: '' + user.item_Quantity + '',
          price: '' + user.item_Price + ''
        };
        allQP.push(_qp);
      });
  
      setQProducts(allQP);
    }
  }, [quotation]);

  const filteredUsers = items.filter((user) =>
    user.item_ID.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const generateQuotation = () => {
     
    // let qp = null;

    axios.post('http://localhost:8080/addquotation/'+id, {

        grandtotal: ''+(subtotal+(users.price*users.time)).toFixed(2)+'',
        service_Type: ''+users.service+'',
        qp: QProducts,
        service_Fee: ''+(users.price*users.time).toFixed(2)+'',
    })
      .then(response => {
        console.log(response.data);
        alert.show("Quotation generated successfully")
      })
      .catch(error => {
        console.log(error.message);
        alert.show("Quotation Not Generated")
      });
  };
    return(

        <div className={`Technician ${!isSidebarOpen ? 'Technician--screen-minimized' : ''}`}>
        <form id="form1" runat="server" className={'quotation'} style={{ maxWidth: '800px', alignContent: 'center', margin: '0 auto', padding: '25px', border: '1px solid #ddd', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <header class="clearfix">
      <div id="logo">
        <img src={Logo}></img>
      </div>
      <h1>QUOTATION</h1>
      <div id="company" class="clearfix">
        <div>CMELECTRIC</div>
        <div>744 Kamagugu,<br />Mbombela, 1200, <br />South Africa</div>
        <div>+27 76 457 4995</div>
        <div><a href="#">info@cmelectric.com</a></div>
      </div>
      <div id="project">
        <div id="custname" runat="server">CUSTOMER:{users.user_Name+" "+users.user_Surname} </div>
        <div id="address" runat="server">ADDRESS:{users.address} </div>
        <div id="email" runat="server">EMAIL:{users.user_Email}</div>
        <div id="tdate" runat="server">DATE</div>
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="service">Name</th>
            <th class="desc">DESCRIPTION</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.item_Name}</td>
                <td>{user.item_Brand+" "+user.item_Capacity}</td>
                <td>R{Number(user.item_Price).toFixed(2)}</td>
                <td>{user.item_Quantity}</td>
                <td>R{(user.item_Price*user.item_Quantity).toFixed(2)}</td>
              </tr>
            ))}

          <tr>
            <td colspan="4">SUBTOTAL</td>
            <td class="total" id="subtotal" runat="server">R{subtotal}</td>
          </tr>
          <tr>
            <td colspan="4">SERVICE(LABOUR) FEE</td>
            <td class="total" id="servicefee" runat="server">R{(users.price*users.time).toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="4" class="grand total">GRAND TOTAL</td>
            <td class="grand total" id="grandtotal" runat="server">R{(subtotal+(users.price*users.time)).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </main>
    </form>
    <h2 class="form-title">Message:</h2>
      <div class="form-group">
          <textarea type="text" class="form-input" name="response" id="response" placeholder="No message" cols="100" rows="13" value={users.inspection} readOnly></textarea>
      </div>
      <div class="form-group">
           <button  class="btn-book-a-table" style={{border:'none', padding:'10px'}} type="submit" onClick={()=>generateQuotation()}>Generate Quotation</button>
      </div>
    </div>
    
    );
}
export default Quotation
