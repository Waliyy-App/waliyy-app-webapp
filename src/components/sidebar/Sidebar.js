import React from 'react';
import Logo from '../../assets/logo/logo-nobg.png';
import Female from '../../assets/illustrations/female-illus.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const SidebarComponent = () => {
  const location = useLocation();

  const navigate = useNavigate();

 const handleProfileClick = () => {
    // Assuming isUser is a boolean variable
    const isUser = true;

    // Navigate to the profile page with the state
    navigate('/profile', { state: { isUser } });
  };
  return (
    <div className="h-screen flex">
      <aside className="w-[280px] bg-[#F2EEFB] px-8 pb-8 flex flex-col justify-between fixed inset-y-0 left-0 h-screen">
        <div className="flex flex-col">
          <Link className="h-[150px] w-[150px] mx-auto" to="/">
            <img
              src={Logo}
              alt="logo"
              className="h-full w-full object-fill rounded-2xl"
            />
          </Link>

          <div className="flex flex-col gap-4">
            <NavLink
              to="/dashboard"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
                location.pathname === '/'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <HomeIcon /> Home
            </NavLink>

            <NavLink
              to="/likes"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
                location.pathname === '/likes'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <ThumbUpIcon /> Likes
            </NavLink>

            <NavLink
              to="/match"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
                location.pathname === '/match'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <FavoriteIcon /> Match
            </NavLink>

            <NavLink
              to="/settings"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300  ${
                location.pathname === '/settings'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <SettingsIcon /> Settings
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="border border-[#2D133A] w-full"></div>
          <div className="flex items-center text-[#2D133A] w-full justify-between px-2">
            <div
              onClick={handleProfileClick}
              className="flex gap-2 items-center text-sm font-semibold cursor-pointer"
            >
              <img src={Female} alt="" className="h-8 w-8" />
              Raufah
            </div>

            <Link to="/">
              <LogoutIcon />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SidebarComponent;
