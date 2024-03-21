import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
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
import { getChild } from '../../services/index.js';
import { useAuthContext } from '../../context/AuthContext.js';
import Loader from '../Loader.js';

const ProfileDetails = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // const location = useLocation();
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);

  // const { id } = useParams();

  const id = '65ef186bedc01fe941ad18be';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, token } = useAuthContext();
  const isUser = user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    const fetchChildData = async () => {
      setLoading(true);
      try {
        const res = await getChild(id, token);
        setData(res.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching child data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <MobileTopNav />
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        } py-[64px] px-8 w-full transition-all duration-300`}
      >
        {loading ? (
          <Loader />
        ) : data ? (
          <React.Fragment>
            <ProfileHeader isUser={isUser} data={data} />
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
              <MeProfile value={value} data={data} />
              <EduProfile value={value} data={data} />
              <DeenProfile value={value} data={data} />
            </div>
          </React.Fragment>
        ) : ''}
      </main>
      <MobileNav />
    </div>
  );
};

export default ProfileDetails;
