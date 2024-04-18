import React from 'react';
import { ReactComponent as FemaleIcon } from '../../assets/illustrations/female-illus.svg';
import { ReactComponent as MaleIcon } from '../../assets/illustrations/male-illus.svg';
import { useNavigate } from 'react-router-dom';

const SettingsHeader = ({ isUser, childId, child }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user);

  const handleProfileClick = () => {
    navigate(`/profile/${childId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between py-8 gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
        <div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
          {child.gender === 'MALE' ? (
            <MaleIcon className="w-24 h-24 z-40" />
          ) : (
            <FemaleIcon className="w-24 h-24 z-40" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#2D133A] text-2xl font-bold">{child.fullName}</p>
          <p className="text-[#667085]">{userObject.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-center sm:self-end">
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
