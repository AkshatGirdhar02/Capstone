import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MCQ from './components/Questions/MCQ';
import TrueFalse from './components/Questions/TrueFalse';
import OneLiner from './components/Questions/OneLiner';
import OneWord from './components/Questions/OneWord';
import Random from './components/Questions/Random';
import Result from './components/Result';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={!loggedIn ? <Login setLoggedIn={setLoggedIn} setUser={setUsername} /> : <Navigate to="/home" />} />
      <Route path="/home" element={loggedIn ? <Home username={username} /> : <Navigate to="/login" />} />
      <Route path="/MCQ" element={loggedIn ? <MCQ/> : <Navigate to="/home" />} />
      <Route path="/TrueFalse" element={loggedIn ? <TrueFalse/> : <Navigate to="/home" />} />
      <Route path="/OneWord" element={loggedIn ? <OneWord/> : <Navigate to="/home" />} />
      <Route path="/OneLiner" element={loggedIn ? <OneLiner/> : <Navigate to="/home" />} />
      <Route path="/Random" element={loggedIn ? <Random/> : <Navigate to="/home" />} />
      <Route path="/Result" element={loggedIn ? <Result/> : <Navigate to="/home" />} />
      <Route path="*" element={<Login setLoggedIn={setLoggedIn} setUser={setUsername}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
