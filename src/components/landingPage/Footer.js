import React from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import { Link, NavLink} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-16 bg-[#2D133A] p-5 flex items-center justify-evenly flex-wrap gap-6">
     <NavLink to='/'>
        <img src={Logo} alt="logo" className="w-20" />
      </NavLink>

      <NavLink
        to="/"
        className="text-white text-lg font-semibold transition-all duration-500"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="text-white text-lg font-semibold transition-all duration-500"
      >
        About
      </NavLink>
      <Link
        to="/login"
        className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-white font-medium box-shadow-style transition-all duration-300"
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
  );
};

export default Footer;
