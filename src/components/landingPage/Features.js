import React from 'react';
import Secure from '../../assets/illustrations/security.svg';
import Halal from '../../assets/illustrations/halal.svg';
import { ReactComponent as FilterIcon } from '../../assets/illustrations/gear.svg';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="w-4/5 sm:w-3/5 lg:w-4/5 2xl:w-3/5 mx-auto my-48 bg-white dark:bg-white">
      <div className="flex flex-wrap lg:flex-nowrap w-full gap-6 justify-center">
        <div className="flex flex-col items-center justify-center gap-4 border rounded-lg px-6 sm:px-8 py-8 shadow">
          <div>
            <FilterIcon />
          </div>
          <div className="text-[#2d133a] text-center flex flex-col gap-2">
            <p className="text-2xl font-bold">Smart Filter</p>
            <p className="text-lg">
              Our filters help you set your children’s preferences to quickly
              identify compatible matches tailored just for them.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border rounded-lg px-6 sm:px-8 py-8 shadow">
          <div>
            <img src={Secure} alt="" />
          </div>
          <div className="text-[#2d133a] text-center flex flex-col gap-2">
            <p className="text-2xl font-bold">Safe and Secure</p>
            <p className="text-lg">
              Your privacy is our priority. Make connections confidently knowing
              that your personal information is protected.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border rounded-lg px-6 sm:px-8 py-8 shadow">
          <div>
            <img src={Halal} alt="" />
          </div>
          <div className="text-[#2d133a] text-center flex flex-col gap-2">
            <p className="text-2xl font-bold">Halal Connections</p>
            <p className="text-lg">
              We ensure that your search for companionship adheres to Islamic
              principles, prioritizing privacy and integrity throughout your
              journey.
            </p>
          </div>
        </div>
      </div>
      
      <Link
        to="/"
        className="flex items-center justify-center w-full sm:w-[350px] mx-auto mt-16 rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Features;
