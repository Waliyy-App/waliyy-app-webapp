import React, { useState } from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const location = useLocation();
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const handleToggle = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };
  return (
    <div className="px-6 sm:px-12 gap-4 flex justify-between items-center">
      <img src={Logo} alt="logo" className="w-20" />

      <div className="relative flex sm:hidden">
        <button onClick={handleToggle}>
          <MenuIcon />
        </button>
        {toggleMobileMenu && (
          <div className="absolute top-5 right-0 bg-white p-10 shadow-xl flex flex-col gap-6 items-center">
            <NavLink
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'text-[#a37eff]'
                  : 'text-[#2D133A] hover:text-[#a37eff]'
              }  text-lg font-semibold transition-all duration-500`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={` ${
                location.pathname === '/about'
                  ? 'text-[#a37eff]'
                  : 'text-[#2D133A] hover:text-[#a37eff]'
              }  text-lg font-semibold transition-all duration-500`}
            >
              About
            </NavLink>
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
          </div>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-6 justify-center">
        <NavLink
          to="/"
          className={`${
            location.pathname === '/'
              ? 'text-[#a37eff]'
              : 'text-[#2D133A] hover:text-[#a37eff]'
          }  text-lg font-semibold transition-all duration-500`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={` ${
            location.pathname === '/about'
              ? 'text-[#a37eff]'
              : 'text-[#2D133A] hover:text-[#a37eff]'
          }  text-lg font-semibold transition-all duration-500`}
        >
          About
        </NavLink>
      </div>
      <div className="hidden sm:flex items-center gap-6">
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
      </div>
    </div>
  );
};

export default Navbar;
