import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  storeAuthCookie: (data) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["waliyy_user"]);
  const [token, setToken] = useState(cookies.waliyy_user);
  const navigate = useNavigate();

  function storeAuthCookie(data) {
    setCookie("waliyy_user", data.token, {
      path: "/",
      maxAge: 3600 * 24 * 30, // 30 days
    });

    setIsLoggedIn(true);
  }

  function logOut() {
    removeCookie("waliyy_user", {
      path: "/",
      maxAge: 3600 * 24 * 30,
    });

    setIsLoggedIn(false);
    navigate("/login");
  }

  useEffect(() => {
    if (cookies.waliyy_user) {
      setToken(cookies.waliyy_user);
      setIsLoggedIn(true);
    }
  }, [cookies.waliyy_user]);

  // Add route protection
  useEffect(() => {
    const unprotectedRoutes = [
      "/",
      "/login",
      "/sign-up",
      "/forgot-password",
    ];

    if (!isLoggedIn && !unprotectedRoutes.includes(window.location.pathname)) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        storeAuthCookie,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
