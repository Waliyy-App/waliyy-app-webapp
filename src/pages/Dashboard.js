import React from 'react';
import SidebarComponent from '../components/sidebar/Sidebar';
import ProfileView from '../components/ProfileCard';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex">
      <SidebarComponent />
      <main className="ml-[280px] py-[64px] px-8 w-full">
        <Link to='/filter' className='flex justify-end py-8'>
          <HiOutlineAdjustmentsHorizontal className='h-8 w-8' />
        </Link>
        <div className="flex flex-wrap gap-6">
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
          <ProfileView />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
