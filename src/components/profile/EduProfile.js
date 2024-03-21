import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const EduProfile = ({ value, data }) => {
  return (
    <CustomTabPanel value={value} index={1}>
      <div className="flex flex-col sm-flex-row items-start gap-8 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              About my education and profession!
            </p>
            <p>{data.aboutEducationAndJob}</p>
          </div>
          <div>
            <p className="mb-[10px] text-lg font-semibold">
              My short/medium term qualification and professional plans
            </p>
            <p>{data.professionalPlans}</p>
          </div>

          {data.isWillingToRelocate && (
            <div>
              <p className="mb-[10px] text-lg font-semibold">
                Willing to relocate to...
              </p>
              <p>{data.relocationPlans}</p>
            </div>
          )}
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-8">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.educationLevel}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.employmentStatus}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold">
              {data.profession}
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default EduProfile;
