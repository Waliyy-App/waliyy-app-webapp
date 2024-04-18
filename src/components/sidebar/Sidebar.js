import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo/logo-nobg-cropped.png';
import LogoIcon from '../../assets/logo/logo-icon.png';
import { toast } from 'react-toastify';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { getChildren, logoutFunc } from '../../services';
import { useAuthContext } from '../../context/AuthContext';

const SidebarComponent = ({ isOpen, toggleMenu }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [children, setChildren] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logOut, handleChildId } = useAuthContext();
  const childId = localStorage.getItem('childId');

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await getChildren(token);
        setChildren(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChildren();
  }, [token]);

  const handleChildLogin = (id) => {
    handleChildId(id);
    navigate('/dashboard');
    setOpenDropdown(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutFunc(token);
      logOut();
      navigate('/');
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      logOut();
      navigate('/login');
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <React.Fragment>
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
                to={`/profile/${childId}`}
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

                <div className="border border-[#2d133a1f] w-full mt-10"></div>

                {children && (
                  <div className="flex flex-col text-[#2D133A] px-3">
                    <p className="text-xs my-6 flex items-center gap-1">
                      {isOpen ? '' : 'Switch Accounts'}
                      <SwapHorizIcon />
                    </p>
                    <div className="flex flex-col max-h-[200px] overflow-y-auto">
                      {children.map((child, index) => (
                        <button
                          onClick={() => handleChildLogin(child?.id)}
                          className="flex p-2 rounded-md gap-3 items-center hover:text-white hover:bg-[#BA9FFE] font-medium"
                          key={index}
                        >
                          <PersonIcon /> {child.firstName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <NavLink
                  to="/get-started"
                  className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
                >
                  <AddIcon /> {isOpen ? '' : 'Add Account'}
                </NavLink>

                <div className="border border-[#2D133A] w-full mt-10 mb-4"></div>

                <button
                  className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon /> {isOpen ? '' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
};

export default SidebarComponent;
