import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const DeenProfile = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={2}>
      <div className="flex flex-col items-start gap-10 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my Islamic Practices!
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div>
            <p className="mb-[10px] text-lg font-semibold">
              Speakers and Scholars I listen to
            </p>
            <div className="flex gap-3">
             Yasir Qahdi
            </div>
          </div>

          
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-4">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Sunni
            </div>

           
              <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
                Revert
              </div>
            

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Pray 5 times daily
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Started practicing recently
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default DeenProfile;
