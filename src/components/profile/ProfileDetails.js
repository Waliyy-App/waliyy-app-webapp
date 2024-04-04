import React, { useState } from 'react';
import SidebarComponent from '../sidebar/Sidebar';
import ProfileHeader from './ProfileHeader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MeProfile from './MeProfile';
import EduProfile from './EduProfile';
import DeenProfile from './DeenProfile';
import { usePersistedState, a11yProps } from '../../utils.js';
import MobileNav from '../sidebar/MobileBottomNav.js';
import MobileTopNav from '../sidebar/MobileTopNav.js';

const ProfileDetails = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <React.Fragment>
          <ProfileHeader />
          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab label="Me" {...a11yProps(0)} />
                <Tab label="My Education and Profession" {...a11yProps(1)} />
                <Tab label="My Deen" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <MeProfile value={value} />
            <EduProfile value={value} />
            <DeenProfile value={value} />
          </div>
        </React.Fragment>
      </main>
      <MobileNav />
    </div>
  );
};

export default ProfileDetails;
