import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { decodeToken } from "../utils.js";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  storeAuthCookie: (data) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["waliyy_user"]);
  const [token, setToken] = useState(cookies.waliyy_user);
  const [data, setData] = useState({});
  const [childId, setChildId] = useState("");
  const [authLoading, setAuthLoading] = useState(true); // 🆕 Track loading state

  const checkTokenExpiration = () => {
    if (token) {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        logOut();
      }
    }
  };

  function handleChildId(id) {
    localStorage.setItem("childId", id);
    setChildId(id);
  }

  function storeAuthCookie(data) {
    setCookie("waliyy_user", data.token, {
      path: "/",
      maxAge: 3600 * 24 * 1, // 1 day
    });
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setData(data);
    setIsLoggedIn(true);
  }

  function logOut() {
    removeCookie("waliyy_user", { path: "/" });
    setUser(null);
    localStorage.clear();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const initAuth = () => {
      if (cookies.waliyy_user) {
        setToken(cookies.waliyy_user);
        setIsLoggedIn(true);
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        checkTokenExpiration();
      }
      setAuthLoading(false);
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
