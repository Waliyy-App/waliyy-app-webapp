import React from 'react';
import NoWifi from '../assets/illustrations/no-wifi.png';

const NetworkError = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <img src={NoWifi} alt="" className="w-[150px] h-[150px]" />
      <div className="flex flex-col justify-center items-center w-4/5 sm:w-[320px] text-center">
        <p className="text-4xl text-[#2d133a] font-bold mb-4">Oops!</p>
        <p className="mb-10 text-lg">
          {error?.status === 'FETCH_ERROR'
            ? 'There seems to be an error with your network connection. Kindly check your internet connection and try again...'
            : 'We ran into an error. Kindly refresh the page.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
};

export default NetworkError;
