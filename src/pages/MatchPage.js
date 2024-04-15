import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import MobileTopNav from '../components/sidebar/MobileTopNav.js';
import ProfileCard from '../components/ProfileCard.js';

const MatchPage = () => {
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
        } py-[64px] px-8 w-full transition-all duration-300`}
      >
        <div>
          <div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
            <p className="text-[#BA9FFE]">Match</p>
            <p className="text-[#2D133A] font-bold text-4xl">
              This is who you have matched with.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileCard />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default MatchPage;
