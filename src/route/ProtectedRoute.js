import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { decodeToken } from "../utils.js";

const ProtectedRoute = () => {
  const { user, isLoggedIn, token, logOut, authLoading } = useAuthContext();
  const location = useLocation();

  const checkTokenExpiration = () => {
    if (token) {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        logOut();
        return false;
      }
    }
    return true;
  };

  if (authLoading) return null; // or show spinner

  const isValidated = Boolean(user) && isLoggedIn && checkTokenExpiration();

  return isValidated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
