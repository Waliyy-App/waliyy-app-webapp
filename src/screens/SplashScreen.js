import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo/logo-icon.png';
import { useAuthContext } from '../context/AuthContext';


const SplashScreen = () => {
  const navigate = useNavigate();
  const { data, handleChildId } = useAuthContext();


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data?.children?.length >= 1) {
        handleChildId(data?.children?.[0]?.id);
        navigate('/dashboard');
      } else navigate('/profile-required');
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [data, handleChildId, navigate]);

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
            Welcome to WaliyyApp
          </p>
          <p className="text-[#665e6b] text-center font-normal">
            A meeting platform where hearts find their forever homes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
