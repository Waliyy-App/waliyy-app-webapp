import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { decodeToken } from "../utils.js";

const ProtectedRoute = () => {
  const { user, isLoggedIn, token, logOut, authLoading, data } = useAuthContext();
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

  if (authLoading) return null;

  const isValidated = Boolean(user) && isLoggedIn && checkTokenExpiration();

  // Profile completion check
  const hasProfile = data?.children && data.children.length > 0;
  const isAllowedPath =
    location.pathname === "/get-started" ||
    location.pathname === "/profile-required" ||
    location.pathname === "/verification-success";

  if (isValidated && !hasProfile && !isAllowedPath) {
    return <Navigate to="/profile-required" replace />;
  }

  return isValidated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
