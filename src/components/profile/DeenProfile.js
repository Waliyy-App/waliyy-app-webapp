import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const DeenProfile = ({ value, data }) => {
  return (
    <CustomTabPanel value={value} index={2}>
      <div className="flex flex-col sm:flex-row items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my Islamic Practices!
            </p>
            <p>{data.descriptionOfIslamicPractice}</p>
          </div>

          <div>
            <p className="mb-[10px] text-lg font-semibold">
              Speakers and Scholars I listen to
            </p>
            <div className="flex gap-3">
              {data.speakersListenedTo.map((scholar) => (
                <p>{scholar}.</p>
              ))}
            </div>
          </div>

          {data.belongsToIslamicOrganization && (
            <div>
              <p className="mb-[10px] text-lg font-semibold">
                Islamic organizations I belong to
              </p>
              <p>{data.islamicOrganizationName}</p>
            </div>
          )}
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-8">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.sect}
            </div>

            {data.isARevert && (
              <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
                Revert
              </div>
            )}

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.salatPattern}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.startedPracticingIn}
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default DeenProfile;
