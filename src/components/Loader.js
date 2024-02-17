import React from 'react';
import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Hearts
        height="200"
        width="200"
        color="#BA9FFE"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
