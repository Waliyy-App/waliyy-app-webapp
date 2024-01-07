import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Liked from '../components/likes/Liked';
import LikedYou from '../components/likes/LikedYou';
import PassedProfile from '../components/likes/PassedProfile';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LikePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <main className="ml-[280px] py-[64px] px-8 w-full">
        <div className='flex justify-center'>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="icon position tabs example"
          >
            <Tab
              icon={<ThumbUpIcon />}
              iconPosition="start"
              label="Liked"
              {...a11yProps(0)}
            />
            <Tab
              icon={<ThumbUpIcon />}
              iconPosition="start"
              label="Liked You"
              {...a11yProps(1)}
            />
            <Tab
              icon={<ThumbDownIcon />}
              iconPosition="start"
              label="Passed"
              {...a11yProps(2)}
            />
          </Tabs>
        </div>

        <Liked value={value} />
        <LikedYou value={value} />
        <PassedProfile value={value} />
      </main>
    </div>
  );
};

export default LikePage;
