import React, { useState } from "react";
import Logo from "../../assets/logo/logo-nobg-cropped.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../../context/AuthContext";
import { logoutFunc } from "../../services";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const { isLoggedIn, token, logOut } = useAuthContext();

  const handleToggle = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutFunc(token);
      }
      logOut();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      logOut();
      navigate("/login");
    }
  };
  return (
    <div className="px-6 sm:px-12 gap-4 flex justify-between items-center mx-auto bg-white dark:bg-white pb-4">

      <NavLink to="/">
        <img src={Logo} alt="logo" className="w-20" />
      </NavLink>

      <div className="relative flex sm:hidden">
        <button onClick={handleToggle}>
          <MenuIcon />
        </button>
        {toggleMobileMenu && (
          <div className="absolute top-5 right-0 bg-white p-10 shadow-xl flex flex-col gap-6 items-center">
            <NavLink
              to="/"
              className={`${location.pathname === '/'
                  ? 'text-[#a37eff]'
                  : 'text-[#2D133A] hover:text-[#a37eff]'

                }  text-lg font-semibold transition-all duration-500`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={` ${location.pathname === '/about'
                  ? 'text-[#a37eff]'
                  : 'text-[#2D133A] hover:text-[#a37eff]'

                }  text-lg font-semibold transition-all duration-500`}
            >
              About
            </NavLink>

            <NavLink
              to="/resources"
              className={` ${location.pathname === '/resources'
                  ? 'text-[#a37eff]'
                  : 'text-[#2D133A] hover:text-[#a37eff]'
                }  text-lg font-semibold transition-all duration-500`}
            >
              Resources
            </NavLink>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-[#a37eff] hover:text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-[#a37eff] hover:text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-6">
        <NavLink
          to="/"
          className={`${location.pathname === '/'
              ? 'text-[#a37eff]'
              : 'text-[#2D133A] hover:text-[#a37eff]'
            }  text-lg font-semibold transition-all duration-500`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={` ${location.pathname === '/about'
              ? 'text-[#a37eff]'
              : 'text-[#2D133A] hover:text-[#a37eff]'
            }  text-lg font-semibold transition-all duration-500`}
        >
          About
        </NavLink>
        <NavLink
          to="/resources"
          className={` ${location.pathname === '/resources'
              ? 'text-[#a37eff]'
              : 'text-[#2D133A] hover:text-[#a37eff]'
            }  text-lg font-semibold transition-all duration-500`}
        >
          Resources
        </NavLink>
      </div>

      <div className="hidden sm:flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-[#a37eff] hover:text-white font-medium box-shadow-style transition-all duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-[#a37eff] hover:text-white font-medium box-shadow-style transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
