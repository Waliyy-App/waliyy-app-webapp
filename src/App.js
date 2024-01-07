import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';
import LikePage from './pages/LikePage';
import MatchPage from './pages/MatchPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import { Filters } from './pages/Filters';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/likes" element={<LikePage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/pricing" element={<PricingPage />} />


        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign-up/setup" element={<ProfileSetup />} />

        <Route path="/filter" element={<Filters />} />
      </Routes>
    </div>
  );
}

export default App;
