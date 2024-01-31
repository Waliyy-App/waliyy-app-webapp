import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../components/sidebar/Sidebar.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { usePersistedState, a11yProps } from '../utils.js';
import SettingsHeader from '../components/settings/SettingsHeader.js';
import PersonalDetailSetting from '../components/settings/PersonalDetailSetting.js';
import NationalitySettings from '../components/settings/NationalitySettings.js';
import EducationSettings from '../components/settings/EducationSettings.js';
import DeenSettings from '../components/settings/DeenSettings.js';
import SummarySettings from '../components/settings/SummarySettings.js';
import AccountSettings from '../components/settings/AccountSettings.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import MobileTopNav from '../components/sidebar/MobileTopNav.js';

const SettingsPage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isUser = location.state && location.state.isUser;

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
        <SettingsHeader isUser={isUser} />
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Personal Details" {...a11yProps(0)} />
              <Tab label="Heritage & Nationality" {...a11yProps(1)} />
              <Tab label="Education & Profession" {...a11yProps(2)} />
              <Tab label="Deen" {...a11yProps(3)} />
              <Tab label="Self Summary" {...a11yProps(4)} />
              <Tab label="Account" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <PersonalDetailSetting value={value} />
          <NationalitySettings value={value} />
          <EducationSettings value={value} />
          <DeenSettings value={value} />
          <SummarySettings value={value} />
          <AccountSettings value={value} />
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default SettingsPage;
