import React, { useState } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { Router, Routes, Route, Link } from 'react-router-dom';
import '../assets/css/Overview.css';
import Clientschart from './charts/Clientschart';
import Profitsschart from './charts/Profitschart';
import Appointmentsschart from './charts/Appointmentsschart';
import EventCalender from './charts/EventCalender';
import { FaChartBar } from 'react-icons/fa';

const Overview = ({ isSidebarOpen }) => {
  const [activeContent, setActiveContent] = useState('EventCalender');

  const renderActiveContent = () => {
    switch (activeContent) {
      case 'EventCalender':
        return <EventCalender />;
      case 'Clientschart':
        return <Clientschart />;
      case 'Profitsschart':
        return <Profitsschart />;
      case 'Appointmentsschart':
        return <Appointmentsschart />;
      default:
        return null;
    }
  };

  return (
    <div className={`Overview ${!isSidebarOpen ? 'Overview--screen-minimized' : ''}`}>
      <div className="heading">
        <h1>
          <FaChartBar /> Dashboard
        </h1>
      </div>
      <div className="Options">
      <button className="nav-link-item" onClick={() => setActiveContent('EventCalender')}>
          Work Schedule
        </button>
        <button className="nav-link-item" onClick={() => setActiveContent('Clientschart')}>
          Clients
        </button>
        <button className="nav-link-item" onClick={() => setActiveContent('Profitsschart')}>
          Gross Revenue
        </button>
        <button className="nav-link-item" onClick={() => setActiveContent('Appointmentsschart')}>
          Appointments
        </button>
      </div>
      {renderActiveContent()}
    </div>
  );
};

export default Overview;
