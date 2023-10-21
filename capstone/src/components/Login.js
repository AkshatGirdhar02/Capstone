// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const Login = ({ setLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const endpoint = isRegistering ? '/api/register' : '/api/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, { username, password });

      if (response.data.success) {
        setLoggedIn(true);
        setUser(username);
        navigate('/home');
      } else {
        alert(response.data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className={`login-container ${isRegistering ? 'register-mode' : ''}`}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
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
      <button onClick={handleLogin}>{isRegistering ? 'Register' : 'Login'}</button>
      <p>
        {isRegistering
          ? 'Already have an account?'
          : "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
