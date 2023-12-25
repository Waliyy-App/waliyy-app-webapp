import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SplashScreen from './pages/SplashScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/splash" element={<SplashScreen />} />
      </Routes>
    </div>
  );
}

export default App;
