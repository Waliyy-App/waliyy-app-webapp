import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextInput } from '../../common/form';

const AccountSettings = ({ value, handleComplete }) => {
  const initialValues = {
    name: 'Oladunni Odetunde',
    emailAddress: 'dunniraufah@gmail.com',
    altEmailAddress: 'delzeen@ymail.com',
    phoneNumber: '08108202722',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  return (
    <CustomTabPanel value={value} index={5}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleComplete();
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="flex flex-col gap-10 px-8">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg text-[#2D133A]">Account</p>
            <p className="text-[#667085] text-sm">Update your account here</p>
            <div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
          </div>

          <div className="flex justify-between gap-12">
            <TextInput label="Full Name" name="name" type="text" readOnly />

            <TextInput
              label="Email Address"
              name="emailAddress"
              type="email"
              readOnly
            />
          </div>

          <div className="flex justify-between gap-12">
            <TextInput
              label="Alternative Email Address"
              name="altEmailAddress"
              type="email"
            />
            <TextInput label="Phone Number" name="phoneNumber" type="text" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg text-[#2D133A]">Password</p>
            <p className="text-[#667085] text-sm">Change your password here</p>
            <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-4" />
          </div>

          <div className="flex justify-between gap-12">
            <TextInput
              label="Old Password"
              name="oldPassword"
              type="password"
            />
            <TextInput
              label="New Password"
              name="newPassword"
              type="password"
            />
            <TextInput
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
            />
          </div>

          <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

          <div className="w-full flex gap-8 justify-end items-center">
            <button className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
              Cancel
            </button>
            <button
              className="bg-[#BA9FFE] hover:bg-[#a37eff] text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </Formik>
    </CustomTabPanel>
  );
};

export default AccountSettings;
