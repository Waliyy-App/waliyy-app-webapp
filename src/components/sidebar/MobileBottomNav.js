import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const MobileNav = () => {
  const location = useLocation();
  const childId = localStorage.getItem('childId');

  return (
    <div className="sticky bottom-5 w-11/12 bg-[#F2EEFB] mx-auto h-full rounded-[64px] sm:hidden flex justify-between z-30">
      <NavLink
        to="/dashboard"
        className={`flex justify-center items-center py-2 px-3 h-12 w-12 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/dashboard'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <AutoAwesomeIcon />
      </NavLink>

      <NavLink
        to="/likes"
        className={`flex justify-center items-center py-2 px-3 h-12 w-12 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/likes'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <ThumbUpIcon />
      </NavLink>

      <NavLink
        to="/match"
        className={`flex justify-center items-center py-2 px-3 h-12 w-12 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/match'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <FavoriteIcon />
      </NavLink>

      <NavLink
        to="/explore"
        className={`flex justify-center items-center py-2 px-3 h-12 w-12 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === '/explore'
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <PersonSearchIcon />
      </NavLink>

      <NavLink
        to={`/profile/${childId}`}
        className={`flex justify-center items-center py-2 px-3 h-12 w-12 rounded-full font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
          location.pathname === `/profile/${childId}`
            ? 'text-white bg-[#BA9FFE] box-shadow-style'
            : 'text-[#2D133A]'
        }`}
      >
        <AccountBoxIcon />
      </NavLink>

      
    </div>
  );
};

export default MobileNav;
