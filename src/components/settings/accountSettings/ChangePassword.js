import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextInput } from '../../../common/form';
import { changePassword } from '../../../services';

const ChangePassword = () => {
  const [error, setError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(null);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const handlePasswordChange = async (values) => {
    setError(null);
    setPasswordChanged(null);
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmNewPassword,
      });

      console.log('Success');
      setPasswordChanged(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handlePasswordChange(values)}
    >
      <Form className="flex flex-col gap-10 px-0 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-lg text-[#2D133A]">Password</p>
          <p className="text-[#667085] text-sm">Change your password here</p>
          <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-4" />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4">
            {error}
          </div>
        )}
        {passwordChanged && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md my-4">
            {passwordChanged}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput label="Old Password" name="oldPassword" type="password" />
          <TextInput label="New Password" name="newPassword" type="password" />
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
  );
};

export default ChangePassword;
