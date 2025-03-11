import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../Login/login';
import Register from '../Login/register';
import Home from '../Pages/home';

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="logaut*" element={<Login />} />
    </Routes>
  );
}
export default Rutas;
