import React from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import LogoIcon from '../../assets/logo/logo-icon.png';
import Female from '../../assets/illustrations/female-illus.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarComponent = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isUser = true;
    navigate('/profile', { state: { isUser } });
  };

  return (
    <div className="h-screen flex">
      <aside
        className={` ${
          isOpen ? 'w-[100px] px-2' : 'w-[280px] px-8'
        } bg-[#F2EEFB] py-8 flex flex-col justify-between 2xl:justify-start fixed inset-y-0 left-0 h-screen 2xl:h-full transition-all duration-300`}
      >
        <div className="flex flex-col">
          <div
            className='w-100 flex justify-between transition-all duration-300 mb-11'
          >
            <Link
              className={isOpen ? 'h-12 w-10' : 'h-[90px] w-[140px]'}
              to="/"
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
                location.pathname === '/'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <HomeIcon /> {isOpen ? '' : 'Home'}
            </NavLink>

            <NavLink
              to="/likes"
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

            <NavLink
              to="/settings"
              className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 ${
                isOpen && 'justify-center'
              }  ${
                location.pathname === '/settings'
                  ? 'text-white bg-[#BA9FFE] box-shadow-style'
                  : 'text-[#2D133A]'
              }`}
            >
              <SettingsIcon /> {isOpen ? '' : 'Settings'}
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="border border-[#2D133A] w-full"></div>
          <div className="flex flex-wrap items-center text-[#2D133A] w-full justify-between px-2 gap-8">
            <div
              onClick={handleProfileClick}
              className="flex gap-2 items-center text-sm font-semibold cursor-pointer"
            >
              <img
                src={Female}
                alt=""
                className={isOpen ? 'h-6 w-6' : 'h-8 w-8'}
              />
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
