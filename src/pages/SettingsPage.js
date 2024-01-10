import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';

const SettingsPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default SettingsPage;
