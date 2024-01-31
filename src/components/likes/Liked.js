import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import ProfileCard from '../ProfileCard';

const Liked = ({ value }) => {
  return (
    <div>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
          <p className="text-[#2D133A] font-bold text-4xl">Liked</p>
          <p className="text-[#667085] text-xl">
            These are the people you liked and want to match with.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default Liked;
