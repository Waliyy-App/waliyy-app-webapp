import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import Loader from '../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useAuthContext();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Create a password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const handleForgotPassword = async (values) => {
    setLoading(true);
    setSuccess(null);
    try {
      const response = await axios.put(
        `https://waliyy.onrender.com/api/v1/auth/reset-password/${token}`,
        {
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      );

      console.log('success');
      setSuccess(response.message);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 flex justify-center items-center bg-white h-screen">
          <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
            <div className="flex flex-col items-center jutify-center mb-20">
              <p className="text-2xl text-[#2D133A] font-medium mb-2">
                Reset your Password
              </p>
            </div>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md my-4">
                {success}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleForgotPassword(values)}
            >
              <Form className="flex flex-col gap-5">
                <div className="relative">
                  <TextInput
                    label="Password*"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 cursor-pointer top-10"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <div className="relative">
                  <TextInput
                    label="Confirm Password*"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 cursor-pointer top-10"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <button
                  type="submit"
                  className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Reset Password
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
