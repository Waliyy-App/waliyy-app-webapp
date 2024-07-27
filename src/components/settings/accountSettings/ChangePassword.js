import React from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { TextInput } from '../../../common/form';
import { changePassword, logoutFunc } from '../../../services';
import { useAuthContext } from '../../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { token } = useAuthContext();
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleLogout = async () => {
    try {
      const res = await logoutFunc(token);
      logOut();
      navigate('/');
      console.log(res);
      toast.success('Sign in with new password');
    } catch (error) {
      toast.error(error.response.data.message);
      logOut();
      navigate('/login');
    }
  };

  const handlePasswordChange = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    try {
      const res = await changePassword(
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        token
      );

      toast.success(res?.message);
      handleLogout();
    } catch (error) {
      toast.error(error.response.data.message);
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

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput label="Old Password" name="oldPassword" type="password" />
          <TextInput label="New Password" name="newPassword" type="password" />
          <TextInput
            label="Confirm New Password"
            name="confirmPassword"
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
