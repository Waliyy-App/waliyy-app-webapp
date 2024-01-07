import React from 'react';
import ProfileCard from '../ProfileCard';
import CustomTabPanel from '../../common/CustomTabPanel';

const PassedProfile = ({ value }) => {
  return (
    <div>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-col items-center justify-center gap-3 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#2D133A] font-bold text-4xl">Passed</p>
          <p className="text-[#667085] text-xl">Everyone deserves a second chance. These are the profiles you passed on.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default PassedProfile;
