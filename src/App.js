import React, { useState, useEffect } from 'react';


import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {



  return ( <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
