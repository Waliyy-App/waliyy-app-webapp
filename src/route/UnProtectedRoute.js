import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router';

const UnProtectedRoute = () => {
  const { user, isLoggedIn } = useAuthContext();

  return user && isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default UnProtectedRoute;
