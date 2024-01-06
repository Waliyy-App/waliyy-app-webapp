import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import { FiCheck } from 'react-icons/fi';

const PricingPage = () => {
  return (
    <div className="flex">
      <SidebarComponent />
      <main className="ml-[280px] flex-1 overflow-y-auto py-[64px] px-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center px-8 py-[64px]">
          <p className="text-[#BA9FFE] font-bold">Pricing</p>
          <p className="text-[#101828] font-bold text-4xl">
            You are a step away from finding your future spouse.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-xl text-[#101828] font-bold">Free plan</p>
              <p className="text-4xl text-[#101828] font-bold">₦0/annum</p>
              <p className="text-[#667085]">Our most popular plan.</p>
            </div>

            <div className="flex flex-col pt-8 pb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">View profiles</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">Recieve likes from others</p>
              </div>
            </div>

            <button
              disabled
              className="w-full border text-black font-semibold border-[#BA9FFE] h-12 rounded-lg"
            >
              Current Plan
            </button>
          </div>

          <div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-xl text-[#101828] font-bold">Premium plan</p>
              <p className="text-4xl text-[#101828] font-bold">₦15,000/annum</p>
              <p className="text-[#667085]">
                Do so much more than just browsing.
              </p>
            </div>

            <div className="flex flex-col pt-8 pb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">View profiles</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">Recieve likes from others</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">Like other profiles</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">Make matches</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#667085]">Unmatch profiles</p>
              </div>
            </div>

            <button className="w-full text-white font-semibold hover:bg-[#9b84d3] bg-[#BA9FFE] h-12 rounded-lg">
              Get started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
