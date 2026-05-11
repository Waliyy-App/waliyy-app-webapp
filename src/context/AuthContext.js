import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { decodeToken } from "../utils.js";
import { getCurrentPlan } from "../services/index.js";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  storeAuthCookie: (data) => { },
  logOut: () => { },
  activePlan: null,
  setActivePlan: () => { },
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["waliyy_user"]);
  const [token, setToken] = useState(cookies.waliyy_user);
  const [data, setData] = useState({});
  const [childId, setChildId] = useState("");
  const [authLoading, setAuthLoading] = useState(true); // 🆕 Track loading state
  const [activePlan, setActivePlan] = useState(null);

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
    localStorage.setItem("children", JSON.stringify(data.children)); // 🆕 Persist children
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
        const childrenData = JSON.parse(localStorage.getItem("children")); // 🆕 Retrieve children
        setUser(userData);
        setData((prev) => ({ ...prev, children: childrenData })); // 🆕 Set children in data
        checkTokenExpiration();
      }
      setAuthLoading(false);
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.waliyy_user]);

  useEffect(() => {
    const fetchActivePlan = async () => {
      if (token) {
        try {
          const res = await getCurrentPlan(token);
          setActivePlan(res?.data);
        } catch (err) {
          console.error("Error fetching active plan:", err);
        }
      }
    };
    fetchActivePlan();
  }, [token]);

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
        activePlan,
        setActivePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
