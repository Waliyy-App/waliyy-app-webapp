import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo/logo-icon.png';
import { useAuthContext } from '../context/AuthContext';
import UserList from './UserList';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [selectUserProfile, setSelectUserProfile] = useState(false);

  //   const displayProfiles = () => {
  //     if (user.children > 1) setSelectUserProfile(true);
  //     else navigate('/dashboard');
  //   }; to check if the user has more than one child... after timeout, move to the userList in order to allow user choose which account to move to... but after first setup, should move straight to dashboard

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // if (user) naviage('/dashboard')
      if (user) setSelectUserProfile(true);
      //   added line 19 just to show the UserList component
      else navigate('/get-started');
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [user, navigate]);

  return (
    <React.Fragment>
      {selectUserProfile ? (
        <UserList />
      ) : (
        <div className="w-100 h-screen bg-white flex flex-col items-center justify-center">
          <div className="w-[360px] mx-auto">
            <img
              src={LogoIcon}
              alt="."
              className="w-[150px] h-[170px] mx-auto animate-spin-slow"
            />
            <div className="flex flex-col items-center jutify-center mt-8">
              <p className="text-2xl text-[#2D133A] font-medium mb-3">
                Welcome to Waliyy App
              </p>
              <p className="text-[#665e6b] text-center font-normal">
                Where Walis play matchmakers, and hearts find their forever
                homes.
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SplashScreen;
