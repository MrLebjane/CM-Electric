import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import {MdInventory} from 'react-icons/md'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CloudDownloadIcon, ChatIcon,UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/Inventory.css';
import Borehole from './inventory/Borehole'

const Inventory = ({isSidebarOpen}) => {
    const [isInventory, setInventory] = useState(false);
    const [Inventorypage, setInventorypage] = useState(null);
    return(

        <div className={`Inventory ${!isSidebarOpen ? 'Inventory--screen-minimized' : ''}`}>
            <div className="heading">
                <h1 ><MdInventory className="headlogo"/>Inventory</h1>
            </div>
            <div className="AllInventory">
                <div className="Inventorylist">
                    <Link to="/inventory/borehole" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Borehole Motors</div></Link>
                    <Link  to="/inventory/Generator" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Generators</div></Link>
                    <Link  to="/inventory/solar" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Solar System</div></Link>
                    <Link  to="/inventory/aircon" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Air Conditioning</div></Link>
                    <Link  to="/inventory/electricfence" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Electric Fence</div></Link>
                    <Link  to="/inventory/wires" style={{ color: '#ffffff', textDecoration: 'none' }}><div className="Stock">Wiring</div></Link>
                </div>
            </div>
        </div>
        
    );
};
export default Inventory