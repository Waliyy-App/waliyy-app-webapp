import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import ProfileCard from '../ProfileCard';

const Match = ({ value }) => {
  return (
    <div>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#BA9FFE]">Match</p>
          <p className="text-[#2D133A] font-bold text-4xl">
            This is who you have matched with.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default Match;
