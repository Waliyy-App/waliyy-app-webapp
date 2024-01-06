import React from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import Female from '../../assets/illustrations/female-illus.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiHeart,
  FiHome,
  FiLogOut,
  FiSettings,
  FiThumbsUp,
} from 'react-icons/fi';

const SidebarComponent = () => {
  const location = useLocation();

  return (
    <div className="h-screen bg-[#F2EEFB] p-8 w-[280px] flex flex-col justify-between">
      <div className="flex flex-col">
        <Link className="mb-11" to="/">
          <img
            src={Logo}
            alt="logo"
            className="h-[100px] w-[100px] rounded-2xl"
          />
        </Link>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/"
            className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md hover:text-white hover:bg-[#BA9FFE]  ${
              location.pathname === '/'
                ? 'text-white bg-[#BA9FFE] box-shadow-style'
                : 'text-[#101828]'
            }`}
          >
            <FiHome className="h-6 w-6" /> Home
          </NavLink>

          <NavLink
            to="/likes"
            className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md hover:text-white hover:bg-[#BA9FFE]  ${
              location.pathname === '/likes'
                ? 'text-white bg-[#BA9FFE] box-shadow-style'
                : 'text-[#101828]'
            }`}
          >
            <FiThumbsUp className="h-6 w-6" /> Likes
          </NavLink>

          <NavLink
            to="/match"
            className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md hover:text-white hover:bg-[#BA9FFE]  ${
              location.pathname === '/match'
                ? 'text-white bg-[#BA9FFE] box-shadow-style'
                : 'text-[#101828]'
            }`}
          >
            <FiHeart className="h-6 w-6" /> Match
          </NavLink>

          <NavLink
            to="/settings"
            className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md hover:text-white hover:bg-[#BA9FFE]  ${
              location.pathname === '/settings'
                ? 'text-white bg-[#BA9FFE] box-shadow-style'
                : 'text-[#101828]'
            }`}
          >
            <FiSettings className="h-6 w-6" /> Settings
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col items-end gap-6">
        <div className="border border-[#2D133A] w-full"></div>
        <div className="flex items-center text-[#2D133A] w-full justify-between">
          <Link
            to="/"
            className="flex gap-2 items-center text-sm font-semibold"
          >
            <img src={Female} alt="" className="h-8 w-8" />
            Raufah
          </Link>
          <Link to="/sign-in" className=" h-4 w-4">
            <FiLogOut />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
