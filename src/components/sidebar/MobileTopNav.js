import React, { useState } from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const MobileTopNav = () => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);


  const handleToggle = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

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
          <div className="absolute top-5 right-0 bg-white p-5 rounded-2xl z-[100] w-[200px]">
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
