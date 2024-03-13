import React, { useState } from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import LogoIcon from '../../assets/logo/logo-icon.png';
import {ReactComponent as FemaleIcon} from '../../assets/illustrations/female-illus.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

const SidebarComponent = ({ isOpen, toggleMenu }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isUser = true;
    navigate('/profile', { state: { isUser } });
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="h-screen hidden sm:flex">
      <aside
        className={` ${
          isOpen ? 'w-[100px] px-2' : 'w-[280px] px-8'
        } bg-[#F2EEFB] py-8 flex flex-col justify-between 2xl:justify-start fixed inset-y-0 left-0 h-screen 2xl:h-full transition-all duration-300`}
      >
        <div className="flex flex-col">
          <div className="w-100 flex justify-between transition-all duration-300 mb-11">
            <Link
              className={isOpen ? 'h-12 w-10' : 'h-[90px] w-[140px]'}
              to="/dashboard"
            >
              <img
                src={isOpen ? LogoIcon : Logo}
                alt="logo"
                className="h-full w-full object-fill rounded-2xl"
              />
            </Link>

            <button onClick={toggleMenu}>
              <MenuIcon />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <NavLink
              to="/dashboard"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 ${
                isOpen && 'justify-center'
              }  ${
                location.pathname === '/dashboard'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <HomeIcon /> {isOpen ? '' : 'Home'}
            </NavLink>

            <NavLink
              to="/pricing"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 ${
                isOpen && 'justify-center'
              }  ${
                location.pathname === '/likes'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <ThumbUpIcon /> {isOpen ? '' : 'Likes'}
            </NavLink>

            <NavLink
              to="/match"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 ${
                isOpen && 'justify-center'
              }  ${
                location.pathname === '/match'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <FavoriteIcon /> {isOpen ? '' : 'Match'}
            </NavLink>

            <div
              onClick={handleProfileClick}
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 cursor-pointer ${
                isOpen && 'justify-center'
              }  ${
                location.pathname === '/profile'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <FemaleIcon className="h-6 w-6 rounded-full flex items-center justify-center" />
              {isOpen ? '' : 'Profile'}
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-6 relative">
          <div className="border border-[#2D133A] w-full"></div>
          <div
            onClick={toggleDropdown}
            className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 cursor-pointer ${
              isOpen && 'justify-center'
            }`}
          >
            <MenuIcon /> {isOpen ? '' : 'More'}
          </div>

          {openDropdown && (
            <div className="flex flex-col bg-white p-4 rounded-2xl absolute bottom-14 left-0 w-full z-[100] shadow">
              <NavLink
                to="/settings"
                className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
              >
                <SettingsIcon /> {isOpen ? '' : 'Settings'}
              </NavLink>

              <NavLink
                to="/get-started"
                className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
              >
                <AddIcon /> {isOpen ? '' : 'Add Account'}
              </NavLink>

              <div className="border border-[#2D133A] w-full mt-10"></div>

              <NavLink className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300">
                <LogoutIcon /> {isOpen ? '' : 'Logout'}
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SidebarComponent;
