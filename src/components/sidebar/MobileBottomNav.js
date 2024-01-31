import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="sticky bottom-5 w-11/12 bg-[#F2EEFB] mx-auto h-16 rounded-[64px] sm:hidden flex justify-between z-50">
      <NavLink
        to="/dashboard"
        className={`flex justify-center items-center py-2 px-3 h-16 w-16 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/dashboard'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <HomeIcon />
      </NavLink>

      <NavLink
        to="/likes"
        className={`flex justify-center items-center py-2 px-3 h-16 w-16 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/likes'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <ThumbUpIcon />
      </NavLink>

      <NavLink
        to="/match"
        className={`flex justify-center items-center py-2 px-3 h-16 w-16 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/match'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <FavoriteIcon />
      </NavLink>

      <NavLink
        to="/settings"
        className={`flex justify-center items-center py-2 px-3 h-16 w-16 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/settings'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <SettingsIcon />
      </NavLink>
    </div>
  );
};

export default MobileNav;
