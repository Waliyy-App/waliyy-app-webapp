import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../sidebar/Sidebar';
import ProfileHeader from './ProfileHeader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MeProfile from './MeProfile';
import EduProfile from './EduProfile';
import DeenProfile from './DeenProfile';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ProfileDetails = () => {
  const [value, setValue] =useState(0);
  const location = useLocation();
  const isUser = location.state && location.state.isUser;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <main className="ml-[280px] py-[64px] px-8 w-full">
        <ProfileHeader isUser={isUser} />
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor='inherit'
              indicatorColor='secondary'
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
      </main>
    </div>
  );
};

export default ProfileDetails;
