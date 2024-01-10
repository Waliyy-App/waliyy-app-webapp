import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import ProfileView from '../components/ProfileCard';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { usePersistedState } from '../utils.js';

const Dashboard = () => {
  // Use the custom hook to create a persisted state
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${
          isOpen ? 'ml-[100px]' : 'ml-[280px]'
        } py-[64px] px-8 w-full transition-all duration-300`}
      >
        <Link to="/filter" className="flex justify-end py-8">
          <HiOutlineAdjustmentsHorizontal className="h-8 w-8" />
        </Link>
        <div className="flex flex-wrap gap-6">
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
