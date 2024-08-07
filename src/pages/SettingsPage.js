import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../components/sidebar/Sidebar.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { usePersistedState, a11yProps } from '../utils.js';
import SettingsHeader from '../components/settings/SettingsHeader.js';
import AccountSettings from '../components/settings/AccountSettings.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import UserSetting from '../components/settings/UserSetting.js';
import Billing from '../components/settings/Billing.js';
import { useAuthContext } from '../context/AuthContext.js';
import { getChild } from '../services';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';

const SettingsPage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [child, setChild] = useState({});
  const { token } = useAuthContext();

  const childId = localStorage.getItem('childId');

  useEffect(() => {
    const getCurrentChild = async () => {
      try {
        setLoading(true);
        const currentChild = await getChild(childId, token);
        setChild(currentChild?.data);
      } catch (error) {
        console.error('Error fetching child data:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentChild();
  }, [childId, token]);

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
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        }  w-full transition-all duration-300 bg-[#d4c4fb1d]`}
      >
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <div className="py-[64px] px-8 ">
            <SettingsHeader isUser={isUser} childId={childId} child={child} />
            <div>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  textColor="inherit"
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="User" {...a11yProps(0)} />
                  <Tab label="Billing" {...a11yProps(1)} />
                  <Tab label="Account" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <UserSetting child={child} value={value} />
              <Billing value={value} />
              <AccountSettings value={value} />
            </div>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

export default SettingsPage;
