import React from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="px-6 sm:px-12 flex justify-between items-center">
      <img src={Logo} alt="logo" className="w-20" />
      <div className="flex items-center gap-6">
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
