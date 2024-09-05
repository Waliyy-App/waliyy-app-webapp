import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import MoodIcon from '@mui/icons-material/EmojiEmotions';

import SidebarComponent from '../components/sidebar/Sidebar';
import Liked from '../components/likes/Liked';
import LikedYou from '../components/likes/LikedYou';
import { usePersistedState, a11yProps } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import Navigation from '../components/sidebar/Navigation.js';

const LikedPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [value, setValue] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <div className="py-[64px] px-8">
          {' '}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            className="overflow-scroll"
            indicatorColor="secondary"
            aria-label="icon position tabs example"
            centered
          >
            <Tab
              icon={<MoodIcon />}
              iconPosition="start"
              label="Liked You"
              {...a11yProps(0)}
            />
            <Tab
              icon={<ThumbUpIcon />}
              iconPosition="start"
              label="Liked"
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={value} index={1}>
            <Liked />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={0}>
            <LikedYou />
          </CustomTabPanel>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default LikedPage;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
