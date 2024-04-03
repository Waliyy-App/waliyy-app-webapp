import React, { useState, useEffect } from 'react';
import ClapLogo from '../assets/illustrations/clap.png';
import { Filters } from '../pages/Filters';

const CongratulationsRegister = () => {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowFilters(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <React.Fragment>
      {showFilters ? (
        <Filters />
      ) : (
        <div className="w-100 h-screen bg-white flex flex-col items-center justify-center">
          <div className="w-[360px] mx-auto ">
            <img
              src={ClapLogo}
              alt="."
              className="w-[200px] h-[200px] mx-auto"
            />
            <div className="flex flex-col items-center jutify-center mt-8">
              <p className="text-2xl text-[#2D133A] font-medium mb-3">
                Congratulations!!!
              </p>
              <p className="text-[#665e6b] text-center font-normal">
                Your account is all set
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CongratulationsRegister;
