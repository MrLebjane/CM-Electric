import { BrowserRouter as Router} from 'react-router-dom'
import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';
import AdminDashboard from './components/Admindash';
import Login from './components/LoginForm';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

function App() {
  const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: 'scale',
    containerStyle: {
      zIndex:'10000'
    },
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <Router>
        <div className="App">
          <Login/>
       </div>
    </Router>
    </AlertProvider>
    
  );
}

export default App;
