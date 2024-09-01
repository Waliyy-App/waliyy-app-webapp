import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import Loader from '../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { resetPassword } from '../services';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [pwdToken, setPwdToken] = useState('');
  const [tokenPresent, setTokenPresent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('resetPwdToken');

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
    try {
      setLoading(true);
      const res = await resetPassword({
        password: values.password,
        confirmPassword: values.confirmPassword,
        otp: token,
      });
      toast.success(res?.message);
      localStorage.removeItem('resetPwdToken');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 flex justify-center items-center bg-white h-screen">
          {tokenPresent ? (
            <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
              <div className="flex flex-col items-center jutify-center mb-20">
                <p className="text-2xl text-[#2D133A] font-medium mb-2">
                  Reset your Password
                </p>
              </div>

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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
              <div className="w-full text-center">
                <Link
                  className="text-sm font-medium text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300 flex items-center gap-2 justify-center"
                  to="/login"
                >
                  <FaArrowLeft />
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
              <div className="flex flex-col items-center jutify-center mb-20">
                <p className="text-2xl text-[#2D133A] font-medium mb-2">
                  Enter Reset Token
                </p>
              </div>

              <div className={`flex flex-col w-full relative`}>
                <label
                  className="text-sm font-medium mb-2 text-[#2D133A]"
                  htmlFor="token"
                >
                  Token
                </label>
                <div className="w-full">
                  <input
                    name="token"
                    value={pwdToken}
                    onChange={(e) => setPwdToken(e.target.value)}
                    className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('resetPwdToken', pwdToken);
                  setTokenPresent(true);
                }}
                className="my-11 w-full mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
              >
                Submit Reset Token
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ResetPassword;
