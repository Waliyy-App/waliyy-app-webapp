import React from 'react';
import WebappImage from '../../assets/images/webapp-img.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="px-6 sm:px-12 flex flex-col items-center justify-center my-24 w-full sm:w-[600px] mx-auto">
      <div className="flex gap-9 flex-col items-center justify-center text-[#2D133A]">
        <h1 className="text-capitalize font-bold text-2xl sm:text-3xl text-center">
          Embark on a journey of love, faith and connection...
        </h1>
        <p className="text-center text-lg font-medium">
          Say Salaam to meaningful connections! WaliyyApp is revolutionising the
          Nikah process by handing back responsibility to guardians to support
          their wards in finding like-minded prospects.
        </p>
        <Link
          to="/login"
          className="flex items-center justify-center w-[340px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
        >
          Get Started For Free
        </Link>
      </div>

      <div className="my-20">
        <img src={WebappImage} alt="web app" className="" />
      </div>
    </div>
  );
};

export default Header;
