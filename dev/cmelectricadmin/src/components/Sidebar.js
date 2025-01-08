import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaUserFriends, FaUser, FaEnvelope,FaTimes,FaTools } from 'react-icons/fa';
import {MdInventory} from 'react-icons/md'
import '../assets/css/Sidebar.css'; // Import the CSS file for styling
import Logo from '../assets/img/logo.jpeg'

const Sidebar = ({ isScreenMinimized,onCloseSidebar }) => {
  return (
    <div className="sidebar">
      <div className="navbar_header">
      <div className="navbar__logo">
        <img src={Logo}  alt="Logo" className="navbar__logo-img" />
      </div>
      {isScreenMinimized && (
       <div className="sidebar__close">
          <span onClick={onCloseSidebar}>
            <FaTimes className="sidebar__close-btn" />
          </span>
        </div>
      )}
      </div>
      <ul>
        <li>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <FaChartBar className="sidebar__icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/technicians" style={{ color: '#ffffff', textDecoration: 'none' }} >
            <FaUserFriends className="sidebar__icon" />
            <span>Technicians</span>
          </Link>
        </li>
        <li>
        <Link to="/customers" style={{ color: '#ffffff', textDecoration: 'none' }} >
            <FaUserFriends className="sidebar__icon" />
            <span>Customers</span>
          </Link>
        </li>
        <li>
        <Link to="/messages" style={{ color: '#ffffff', textDecoration: 'none' }} >
            <FaEnvelope className="sidebar__icon" />
            <span>Queries</span>
          </Link>
        </li>
        <li>
          <Link to="/inventory" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <MdInventory className="sidebar__icon" />
            <span>Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/Services" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <FaTools className="sidebar__icon" />
            <span>Services</span>
          </Link>
        </li>
        <li>
          <Link to="/Feedback" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <FaEnvelope className="sidebar__icon" />
            <span>Feedback</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
