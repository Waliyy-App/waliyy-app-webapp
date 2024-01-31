import React from 'react';
import Female from '../../assets/illustrations/female-illus.png';
import { useNavigate } from 'react-router-dom';

const SettingsHeader = ({ isUser }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isUser = true;
    navigate('/profile', { state: { isUser } });
  };

  return (
    <div className="flex items-end justify-between py-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
          <img src={Female} alt="user" className="w-24 h-24 z-40" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#2D133A] text-2xl font-bold">Raufah</p>
          <p className="text-[#667085]">dunniraufah@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleProfileClick}
          className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
