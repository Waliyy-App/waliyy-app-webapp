import React, { useState } from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Female from '../../assets/illustrations/female-illus.png';
import LogoutIcon from '@mui/icons-material/Logout';

const MobileTopNav = () => {
  const navigate = useNavigate();
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const handleProfileClick = () => {
    const isUser = true;
    navigate('/profile', { state: { isUser } });
  };

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
          <div className="absolute top-5 right-0 bg-white p-10 shadow-xl">
            <div className="flex flex-col items-center text-[#2D133A] w-full justify-between px-2 gap-8">
              <div
                onClick={handleProfileClick}
                className="flex gap-3 items-center font-semibold cursor-pointer"
              >
                <img src={Female} alt="" className="h-10 w-10" />
                Raufah
              </div>

              <Link to="/login" className="flex gap-3 text-sm">
                <LogoutIcon />
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTopNav;
