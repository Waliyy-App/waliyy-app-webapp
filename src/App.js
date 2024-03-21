import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import ProfileSetup from './pages/ProfileSetup';
import LikePage from './pages/LikePage';
import MatchPage from './pages/MatchPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import { Filters } from './pages/Filters';
import ProfileDetails from './components/profile/ProfileDetails';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForgotPassword from './pages/ForgotPassword';
import ProfileSetupForm from './pages/ProfileSetupForm';
import LandingPage from './pages/LandingPage';
import AboutLandingPage from './pages/AboutLandingPage';
import ProtectedRoute from './route/ProtectedRoute';
// import UnProtectedRoute from './route/UnProtectedRoute';
import ResetPassword from './pages/ResetPassword';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Nunito, san-serif',
    },
    palette: {
      secondary: {
        main: '#BA9FFE',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about" element={<AboutLandingPage />} />

        <Route exact path="/sign-up" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/likes" element={<LikePage />} />
          <Route exact path="/match" element={<MatchPage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/pricing" element={<PricingPage />} />
          <Route exact path="/get-started" element={<ProfileSetupForm />} />
          <Route exact path="/filter" element={<Filters />} />
          <Route exact path="/profile" element={<ProfileDetails />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
