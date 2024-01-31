import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo/logo-icon.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/sign-up/setup');
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
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
            Where Walis play matchmakers, and hearts find their forever homes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
