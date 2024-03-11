import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';

const Billing = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={1}>
      <div className="flex items-center justify-between my-16">
        <button
          className="bg-[#BA9FFE] hover:bg-[#a37eff] text-white px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
          type="submit"
        >
          Deactivate Account
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
          type="submit"
        >
          Delete Account
        </button>
      </div>
    </CustomTabPanel>
  );
};

export default Billing;
