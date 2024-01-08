import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const MeProfile = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={0}>
      <div className="flex items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">About Me!</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <p className="mb-[10px] text-lg font-semibold">How do i dress?</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className='w-2/5'>
          <p className="text-lg font-semibold mb-8">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              AA
            </div>
            
            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              5 ft 9
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              180lbs
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              Divoced
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              Yoruba
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              Nigerian
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              No Children
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              Doesn't smoke
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              Doesn't drink
            </div>

            <div className="p-1 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-semibold">
              No addictions
            </div>

          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default MeProfile;
