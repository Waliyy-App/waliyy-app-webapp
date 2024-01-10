import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const DeenProfile = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={2}>
      <div className="flex items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my Islamic Practices!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div>
            <p className="mb-[10px] text-lg font-semibold">
              Speakers and Scholars I listen to
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div>
            <p className="mb-[10px] text-lg font-semibold">
              Islamic organizations I belong to
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="w-2/5">
          <p className="text-lg font-semibold mb-8">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Sunni
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Revert
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Prays 5x daily
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Practicing for 5 years
            </div>
            
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default DeenProfile;
