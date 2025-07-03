import React from 'react';
import { FaExclamationTriangle} from 'react-icons/fa';

const MaintenanceBanner = () => {


  return (
    <div className="bg-yellow-500 text-yellow-900 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-center flex-1 w-0 min-w-[200px]">
            <span className="flex p-2 rounded-lg bg-yellow-400">
              <FaExclamationTriangle className="text-xl" />
            </span>
            <p className="ml-3 font-medium ">
              <span className="md:inline">Site under maintenance until</span>
              <span className="font-bold ml-1 whitespace-nowrap">July 9, 2025</span>
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default MaintenanceBanner;