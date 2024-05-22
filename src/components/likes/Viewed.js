import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const Viewed = ({ value }) => {
  return (
    <div>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
          <p className="text-[#2D133A] font-bold text-4xl">Viewed You</p>
          <p className="text-[#667085] text-xl">
            These are the people that are curious about you and viewed your profile.
          </p>
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default Viewed;
