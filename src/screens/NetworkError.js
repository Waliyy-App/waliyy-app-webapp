import React from 'react';
import NoWifi from '../assets/illustrations/no-wifi.png';
import { useNavigate } from 'react-router-dom';

const NetworkError = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <img src={NoWifi} alt="" className="w-[150px] h-[150px]" />
      <div className="flex flex-col justify-center items-center w-4/5 sm:w-[320px] text-center">
        <p className="text-4xl text-[#2d133a] font-bold mb-4">Whoops!</p>
        <p className="mb-10 text-lg">
          There seem to be an error with your network connection
        </p>
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NetworkError;
