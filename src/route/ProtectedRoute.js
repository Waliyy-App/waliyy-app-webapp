import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { user, isLoggedIn } = useAuthContext();

  return user && isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 
