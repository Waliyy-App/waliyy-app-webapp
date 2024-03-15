import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { getChildren } from '../../services';
import { useAuthContext } from '../../context/AuthContext';

const MobileTopNav = () => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const [children, setChildren] = useState([]);
  const { token } = useAuthContext();

  const handleToggle = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

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

  return (
    <div className="sm:hidden flex justify-between items-center bg-white w-full transition-all duration-300 p-6 shadow-2xl sticky top-0 z-50">
      <Link className="h-[100px] w-[100px]" to="/dashboard">
        <img
          src={Logo}
          alt="logo"
          className="h-full w-full object-fill rounded-2xl"
        />
      </Link>

      <div className="relative">
        <button onClick={handleToggle}>
          <MenuIcon />
        </button>
        {toggleMobileMenu && (
          <div className="absolute top-5 right-0 bg-white p-5 rounded-2xl z-[999999] w-[200px]">
            <div className="flex flex-col text-[#2D133A] w-full justify-between gap-3">
              <NavLink
                to="/settings"
                className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
              >
                <SettingsIcon /> Settings
              </NavLink>

              <NavLink
                to="/get-started"
                className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
              >
                <AddIcon /> Add Account
              </NavLink>

              <div className="border border-[#2d133a1f] w-full mt-10"></div>

              {children && (
                <div className="flex flex-col text-[#2D133A] px-3">
                  <p className="text-xs my-6 flex items-center gap-1">
                    Switch Accounts
                    <SwapHorizIcon />
                  </p>
                  <div className="flex flex-col gap-5">
                    {children.map((child, index) => (
                      <div
                        className="flex gap-3 items-center cursor-pointer"
                        key={index}
                      >
                        <PersonIcon /> {child.firstName}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-[#2D133A] w-full mt-10"></div>

              <NavLink className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300">
                <LogoutIcon /> Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTopNav;
