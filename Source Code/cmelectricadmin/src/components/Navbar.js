import React from 'react';
import '../assets/css/Navbar.css'; // Import the CSS file for styling
import { FaBars, FaUserCircle } from 'react-icons/fa'; // Import icons for the menu and user

const Navbar = ({ toggleSidebar, isSidebarOpen, isScreenMinimized }) => {

    
  return (
    <nav className={`navbar ${!isSidebarOpen ? 'navbar--screen-minimized' : ''}`}>
      <div className="navbar__left">
        <button className="navbar__toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {/* <h1 className="navbar__logo">Admin Dashboard</h1> */}
      </div>
      <ul className="navbar__right">
        <li>
          <FaUserCircle className="navbar__userIcon" />
          <span className="navbar__username">Admin</span>
        </li>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
