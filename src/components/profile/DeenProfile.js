import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { capitalize } from '../../utils.js';

const DeenProfile = ({
  value,
  practiceDesc,
  speakers,
  revert,
  salatPattern,
  sect,
  startedPracticingIn,
}) => {
  return (
    <CustomTabPanel value={value} index={2}>
      <div className="flex flex-col items-start gap-10 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my Islamic Practices!
            </p>
            <p>{practiceDesc}</p>
          </div>

          {speakers ? (
            <div>
              <p className="mb-[10px] text-lg font-semibold">
                Speakers and Scholars I listen to
              </p>
              <div className="flex gap-3">
                {speakers.map((speaker) => (
                  <p key={speaker}>{speaker}</p>
                ))}
              </div>
            </div>
          ) : ''}
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-4">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {capitalize(sect)}
            </div>

            {revert && (
              <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
                Revert
              </div>
            )}

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {salatPattern}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {capitalize(startedPracticingIn)}
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default DeenProfile;
