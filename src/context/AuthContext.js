import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
// import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext({
	isLoggedIn: false,
	token: "",
	storeAuthCookie: (data) => {},
	logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState();
	const [cookies, setCookie, removeCookie] = useCookies(["waliyy_user"]);
	const [token, setToken] = useState(cookies.waliyy_user);
	const [data, setData] = useState({});
	const [childId, setChildId] = useState("");
	// const navigate = useNavigate();

	function handleChildId(id) {
		localStorage.setItem("childId", id);
		setChildId(id);
	}

	function storeAuthCookie(data) {
		setCookie("waliyy_user", data.token, {
			path: "/",
			maxAge: 3600 * 24 * 30, // 30 days
		});
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
		setData(data);
		setIsLoggedIn(true);
	}

	function logOut() {
		removeCookie("waliyy_user", {
			path: "/",
			maxAge: 3600 * 24 * 30,
		});
		setUser();
		localStorage.removeItem("user");
		localStorage.removeItem("childId");
		setIsLoggedIn(false);
	}

	useEffect(() => {
		if (cookies.waliyy_user) {
			setToken(cookies.waliyy_user);
			setIsLoggedIn(true);

			const userData = JSON.parse(localStorage.getItem("user"));
			setUser(userData);
		}
	}, [cookies.waliyy_user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				token,
				storeAuthCookie,
				logOut,
				data,
				setData,
				childId,
				handleChildId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
