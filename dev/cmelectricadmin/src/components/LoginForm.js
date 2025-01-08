import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { CloudDownloadIcon, ChatIcon, UserAddIcon } from "@heroicons/react/solid";
import '../assets/css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './Admindash';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Login = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const alert=useAlert()

  // useEffect(() => {
  //   if (data && data.user_Email && data.user_Password) {
  //     if (username === data.user_Email && password === data.user_Password) {
  //       setLoggedIn(true);
  //     } else {
  //       alert.show('Invalid username or password');
  //     }
  //   }
  // }, [data, username, password]);

  const handleLogin = useCallback(() => {
    setLoading(true); // 
    axios.get(`http://localhost:8080/getuseremail/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setData(response.data);
        console.log(response.data.user_Name);
        if (response.data.user_Email === username && response.data.user_Password === password) {
          setLoggedIn(true);
        } else {
          alert.show('Invalid username or password');
        }
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [username, password]);

  if (isLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className={`login ${!isSidebarOpen ? 'login--screen-minimized' : ''}`}>
      <div className="login-form">
        <div className="heading">
          <h2>Login</h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
      </div>
    </div>
  );
};

export default Login;
