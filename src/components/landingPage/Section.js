import React from 'react';
import Illusone from '../../assets/illustrations/Nigeria.svg';

const Section = () => {
  return (
    <div className="flex flex-col gap-28">
      <div className="w-full">
       
        <div className="bg-[#FFF4F6] dark:bg-[#FFF4F6] px-6 sm:px-12 py-12 -my-2 ">
          <div className=" w-4/5 mx-auto flex flex-col sm:flex-row items-center justify-center gap-10">
            <div className="text-[#2D133A] w-full sm:w-3/5 lg:w-[600px] ">
              <p className="text-2xl font-bold mb-3">Nigerian Heritage</p>
              <p className="text-lg">
                Whether you are the guardian of children born and bred in
                Nigeria or diaspora; or they have japa! You will find a
                welcoming community of individuals from all walks of life for
                your child to choose from.
              </p>
            </div>
            <div className="w-full sm:w-2/5">
              <img src={Illusone} alt="" />
            </div>
          </div>
        </div>
       
      </div>

    </div>
  );
};

export default Section;
