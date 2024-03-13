import React from 'react';
import MaleIcon from '../../assets/illustrations/male-illus.svg';
import FemaleIcon from '../../assets/illustrations/female-illus.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BsFillDiamondFill } from 'react-icons/bs';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';

const ProfileHeader = ({ isUser }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between py-8 gap-10">
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
        <div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
          {isUser ? (
            <img src={FemaleIcon} alt='' className="w-24 h-24 z-40" />
          ) : (
            <img src={MaleIcon} alt='' className="w-24 h-24 z-40" />
          )}
        </div>

        <div className="text-[#2D133A] text-center sm:text-left">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <p>{isUser ? 'Raufah' : 'Muhammad'}</p>
            <BsFillDiamondFill className="h-2 w-2" />
            <p>27</p>
          </div>
          <p className="text-lg font-bold">Web Developer</p>

          <div className="flex items-center sm:justify-start justify-center gap-1 ">
            <LocationOnIcon />
            <p className="text-sm font-light">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      {!isUser && (
        <div className="flex items-center gap-3 self-center sm:self-end">
          <button className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300">
            <ThumbUpIcon /> Like
          </button>
          <button className="bg-[#2D133A] hover:bg-[#14091a] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300">
            Pass <ThumbDownIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
