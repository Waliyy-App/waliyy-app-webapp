import React from 'react';
import WebappImage from '../../assets/images/WEBAPP.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="pt-24 w-full md:w-4/5 mx-auto rounded-t-[48px] mt-8 hero-section">
      <div className="flex flex-col items-center justify-center w-4/5 md:w-[600px] mx-auto ">
        <div className="flex gap-9 flex-col items-center justify-center text-[#2D133A]">
          <h1 className="text-capitalize font-bold text-2xl sm:text-3xl text-center">
            Embark on a journey of love, faith and connection...
          </h1>
          <p className="text-center text-lg font-medium">
            Say Salaam to meaningful connections! WaliyyApp is revolutionising
            the Nikah process by providing a platform where eligible Muslim
            bachelors connect with mahaarim of Muslim ladies in order to find
            like-minded prospects. (Mahram/Mahaarim: father and brothers of a
            Muslim lady or her paternal grandfather or uncles).
          </p>
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-[340px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-20">
          <img src={WebappImage} alt="web app" className="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
