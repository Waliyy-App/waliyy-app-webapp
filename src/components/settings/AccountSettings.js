import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import ChangePassword from './accountSettings/ChangePassword';
import ChangeAccountDetails from './accountSettings/ChangeAccountDetails';

const AccountSettings = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={5}>
      <ChangeAccountDetails />

      <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

      <ChangePassword />
    </CustomTabPanel>
  );
};

export default AccountSettings;
