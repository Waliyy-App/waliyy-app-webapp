import React from 'react';
import MaleIcon from '../assets/illustrations/male-illus.svg';
import FemaleIcon from '../assets/illustrations/female-illus.svg';

const UserList = () => {
  return (
    <div className="bg-white text-[#2D133A] w-full sm:w-[360px] flex flex-col items-center justify-center mx-auto h-screen gap-9">

      <p className="text-[#665e6b] text-xl text-center font-semibold">
        Choose an account
      </p>

      <div className="userlist bg-white w-full flex flex-wrap sm:flex-nowrap items-center justify-evenly sm:justify-center gap-6">

        <button className="p-5 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 hover:bg-[#fff4f5] cursor-pointer gap-2">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
            <img
              src={MaleIcon}
              alt=""
              className="w-full h-full object-cover z-40"
            />
          </div>
          <p className="text-medium">Muhammad</p>
        </button>

        <button className="p-5 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 hover:bg-[#fff4f5] cursor-pointer gap-2">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
            <img
              src={MaleIcon}
              alt=""
              className="w-full h-full object-cover z-40"
            />
          </div>
          <p className="text-medium">Muhammad</p>
        </button>

        <button className="p-5 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 hover:bg-[#fff4f5] cursor-pointer gap-2">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
            <img
              src={FemaleIcon}
              alt=""
              className="w-full h-full object-cover z-40"
            />
          </div>
          <p className="font-medium">Raufah</p>
        </button>

      </div>
    </div>
  );
};

export default UserList;
