import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

/**
 * AdminProtectedRoute
 * Guards all /admin/* routes.
 * - If the user is not authenticated → redirect to /login
 * - If the user is authenticated but does NOT have the ADMIN role → redirect to /dashboard
 * - Otherwise → render child routes via <Outlet />
 */
const AdminProtectedRoute = () => {
  const { user, isLoggedIn, authLoading } = useAuthContext();
  const location = useLocation();

  if (authLoading) return null;

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
