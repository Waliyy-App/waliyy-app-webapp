import React from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import LogoIcon from '../../assets/logo/logo-icon.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SidebarComponent = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const childId = localStorage.getItem('childId');

  return (
    <React.Fragment>
      <div className="h-screen hidden sm:flex">
        <aside
          className={` ${
            isOpen ? 'w-[100px] px-2' : 'w-[280px] px-8'
          } bg-[#F2EEFB] py-8 flex flex-col justify-between 2xl:justify-start fixed inset-y-0 left-0 h-screen 2xl:h-full transition-all duration-300`}
        >
          <div className="flex flex-col">
            <div className="w-100 flex justify-between items-center transition-all duration-300 mb-11">
              <Link
                className={isOpen ? 'h-12 w-10' : 'h-[90px] w-[140px]'}
                to="/dashboard"
              >
                <img
                  src={isOpen ? LogoIcon : Logo}
                  alt="logo"
                  className="h-full w-full object-contain rounded-2xl"
                />
              </Link>

              <button
                onClick={toggleMenu}
                className="flex items-center rounded-md font-semibold border-[1px] border-[#BA9FFE] transition duration-300"
              >
                {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </button>
            </div>

            <div className="flex flex-col gap-3">
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
                to="/explore"
                className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 ${
                  isOpen && 'justify-center'
                }  ${
                  location.pathname === '/explore'
                    ? 'text-white bg-[#BA9FFE] box-shadow-style'
                    : 'text-[#2D133A]'
                }`}
              >
                <PersonSearchIcon /> {isOpen ? '' : 'Explore'}
              </NavLink>

              <NavLink
                to={`/profile/${childId}`}
                state={{ from: 'profile' }}
                className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 cursor-pointer ${
                  isOpen && 'justify-center'
                }  ${
                  location.pathname === `/profile/${childId}`
                    ? 'text-white bg-[#BA9FFE] box-shadow-style'
                    : 'text-[#2D133A]'
                }`}
              >
                <AccountBoxIcon />
                {isOpen ? '' : 'Profile'}
              </NavLink>

              <NavLink
                to={`/settings`}
                state={{ from: 'profile' }}
                className={`flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300 cursor-pointer ${
                  isOpen && 'justify-center'
                }  ${
                  location.pathname === `/settings`
                    ? 'text-white bg-[#BA9FFE] box-shadow-style'
                    : 'text-[#2D133A]'
                }`}
              >
                <SettingsIcon />
                {isOpen ? '' : 'Settings'}
              </NavLink>
            </div>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
};

export default SidebarComponent;
