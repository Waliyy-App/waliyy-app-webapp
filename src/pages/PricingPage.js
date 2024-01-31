import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import { FiCheck } from 'react-icons/fi';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import MobileTopNav from '../components/sidebar/MobileTopNav.js';

const PricingPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
       <MobileTopNav />
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        } flex-1 overflow-y-auto py-[64px] px-8 transition-all duration-300`}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#BA9FFE] font-bold">Pricing</p>
          <p className="text-[#2D133A] font-bold text-4xl">
            You are a step away from finding your future spouse.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-xl text-[#2D133A] font-bold">Free plan</p>
              <p className="text-4xl text-[#2D133A] font-bold">₦0/annum</p>
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
              className="w-full border text-[#2D133A] font-semibold border-[#2D133A] h-12 rounded-lg"
            >
              Current Plan
            </button>
          </div>

          <div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-xl text-[#2D133A] font-bold">Premium plan</p>
              <p className="text-4xl text-[#2D133A] font-bold">₦15,000/annum</p>
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

            <button className="w-full text-white font-semibold hover:bg-[#a37eff] bg-[#BA9FFE] h-12 rounded-lg transition-all duration-300">
              Get started
            </button>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default PricingPage;
