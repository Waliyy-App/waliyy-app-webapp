import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const MeProfile = ({ value, data }) => {
  return (
    <CustomTabPanel value={value} index={0}>
      <div className="flex flex-col sm:flex-row items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">About Me!</p>
            <p>{data.about}</p>
          </div>
          <div>
            <p className="mb-[10px] text-lg font-semibold">How do i dress?</p>
            <p>{data.aboutDressing}</p>
          </div>
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-8">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.genotype}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {`${data.height}m`}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {`${data.weight}kg`}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.maritalStatus}
            </div>

            {data.isMixedEthnicity && (
              <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
                {data.mixedEthnicityDescription}
              </div>
            )}

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.citizenship}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.hasChildren === false ? 'No Children' : 'Has Children'}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.isSmoker === false ? 'Does not smoke' : 'Smokes'}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.isDrinker === false ? 'Does not drink' : 'Drinks'}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.hasAddictions === false
                ? 'No addictions'
                : 'Has addictions'}
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default MeProfile;
