import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
	const { user, isLoggedIn, token, logOut } = useAuthContext();

	const checkTokenExpiration = () => {
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				logOut();
				return false;
			}
		}
		return true;
	};

	return user && isLoggedIn && checkTokenExpiration() ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default ProtectedRoute;
