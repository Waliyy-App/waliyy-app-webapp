import React, { useState } from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Match from '../components/match/Match';
import Unmatch from '../components/match/Unmatch';
import { usePersistedState, a11yProps } from '../utils.js';

const MatchPage = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main className={`${isOpen ? 'ml-[100px]' : 'ml-[280px]'} py-[64px] px-8 w-full transition-all duration-300`}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="icon position tabs example"
          centered
        >
          <Tab
            icon={<FavoriteIcon />}
            iconPosition="start"
            label="Match"
            {...a11yProps(0)}
          />
          <Tab
            icon={<HeartBrokenIcon />}
            iconPosition="start"
            label="Unmatch"
            {...a11yProps(1)}
          />
        </Tabs>

        <Match value={value} />
        <Unmatch value={value} />
      </main>
    </div>
  );
};

export default MatchPage;
