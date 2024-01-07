import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Match from '../components/match/Match';
import Unmatch from '../components/match/Unmatch';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MatchPage = () => {
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
        </div>

        <Match value={value} />
        <Unmatch value={value} />
      </main>
    </div>
  );
};

export default MatchPage;
