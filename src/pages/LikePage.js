import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import Liked from '../components/likes/Liked';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import MobileTopNav from '../components/sidebar/MobileTopNav.js';

const LikePage = () => {
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
        <Liked />
      </main>
      <MobileNav />
    </div>
  );
};

export default LikePage;
