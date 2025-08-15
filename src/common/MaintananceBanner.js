import React from 'react';
import { FaExclamationTriangle} from 'react-icons/fa';

const MaintenanceBanner = () => {


  return (
    <div className="bg-yellow-500  mt-4 w-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-center flex-1 w-0 min-w-[200px]">
            <span className="flex p-2 rounded-lg bg-yellow-400">
              <FaExclamationTriangle className="text-xl" />
            </span>
            <p className="ml-3 font-medium">
               Kindly visit your profile settings to update your marital preference (whether you are open to polygyny) and specify your religious sect, so your information remains accurate.
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default MaintenanceBanner;