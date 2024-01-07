import React from 'react';
import SidebarComponent from '../sidebar/Sidebar';

const ProfileDetails = () => {
  return (
    <div className="flex">
      <SidebarComponent />
      <main className="ml-[280px] py-[64px] px-8 w-full">
      Profile Details
      </main>
    </div>
  );
};

export default ProfileDetails;
