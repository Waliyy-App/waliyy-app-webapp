import React from 'react';
import Secure from '../../assets/illustrations/security.svg';
import Halal from '../../assets/illustrations/halal.svg';
import Koran from '../../assets/illustrations/koran.png';
import UX from '../../assets/illustrations/ux.png';
import { ReactComponent as FilterIcon } from '../../assets/illustrations/gear.svg';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="py-48 bg-[#a37eff37]">
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6">
        <div className="flex h-full items-center mb-10 text-[#2d133a]">
          <p className="text-3xl font-bold">What sets us apart</p>
        </div>

        <div className="flex flex-col bg-white rounded-xl px-4 gap-4 py-8">
          <div className="w-8 h-8">
            <img src={Halal} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="text-[#2d133a] flex flex-col gap-2">
            <p className="text-xl font-bold">Halal Meeting Platform</p>
            <p className="">
              Our platform is dedicated to providing a halal meeting place whilst adhering to Islamic principles and values.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-xl px-4 gap-4 py-8">
          <div className="w-8 h-8">
            <FilterIcon className="h-full w-full object-cover" />
          </div>
          <div className="text-[#2d133a] flex flex-col gap-2">
            <p className="text-xl font-bold">Smart Filter</p>
            <p className="">
              Our filters help you set your preferences to quickly identify
              compatible matches tailored just for you.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-xl px-4 gap-4 py-8">
          <div className="w-8 h-8">
            <img src={Koran} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="text-[#2d133a] flex flex-col gap-2">
            <p className="text-xl font-bold capitalize">islamic values</p>
            <p className="">
              Our platform is guided by Islamic values, providing a safe and
              supportive community where you can connect with others who share
              your beliefs and values. We're committed to helping you find a
              partner who shares your commitment to your faith and your vision
              for a happy and fulfilling life.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-xl px-4 gap-4 py-8">
          <div className="w-8 h-8">
            <img src={Secure} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="text-[#2d133a] flex flex-col gap-2">
            <p className="text-xl font-bold capitalize">strict privacy</p>
            <p className="">
              We take your privacy very seriously, ensuring that your personal
              information secure and only accessible to those you authorize. Our
              strict privacy policy allows you to focus on finding the right
              match without worrying about your data.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-xl px-4 gap-4 py-8">
          <div className="w-8 h-8">
            <img src={UX} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="text-[#2d133a] flex flex-col gap-2">
            <p className="text-xl font-bold capitalize">
              user-friendly interface
            </p>
            <p className="">
              Our user-friendly interface makes it easy to navigate and find the
              right match for you. With a simple and intuitive design, you can
              quickly browse profiles, connect with others, and find the perfect
              partner to share your life with.
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/sign-up"
        className="flex justify-center items-center w-4/5 sm:w-[350px] mx-auto mt-16 rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300 capitalize"
      >
        find your match
      </Link>
    </div>
  );
};

export default Features;
