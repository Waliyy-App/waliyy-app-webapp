import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const EduProfile = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={1}>
      <div className="flex items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my education and profession!
            </p>
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
            <p className="mb-[10px] text-lg font-semibold">
              My short/medium term qualification and professional plans
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
              Master's Degree
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Self Employed
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Engineering
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Web Developer
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              Not willing to relocate
            </div>
            
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default EduProfile;
