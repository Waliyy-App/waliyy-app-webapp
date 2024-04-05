import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const UnProtectedRoute = () => {
	const { user, isLoggedIn } = useAuthContext();

	return user && isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
	// normallly it should redirect to dashboard once the user has filled the initial form in get get-started route
};

export default UnProtectedRoute;
