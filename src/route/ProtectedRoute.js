import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import { decodeToken } from "../utils.js";

const ProtectedRoute = () => {
	const { user, isLoggedIn, token, logOut } = useAuthContext();

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

	return user && isLoggedIn && checkTokenExpiration() ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default ProtectedRoute;
