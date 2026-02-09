import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import Loader from '../components/Loader';
import { resetPassword, forgotPassword } from '../services';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: OTP, 2: Password
  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds
  const navigate = useNavigate();

  const resetEmail = localStorage.getItem('resetEmail');

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initialValues = {
    otp: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchemaStep1 = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, 'Must be a 6-digit number')
      .required('Enter the 6-digit OTP'),
  });

  const validationSchemaStep2 = Yup.object({
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Create a password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      await resetPassword({
        password: values.password,
        confirmPassword: values.confirmPassword,
        otp: values.otp,
      });
      setIsSuccess(true);
      localStorage.removeItem('resetEmail');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP or session expired');
      if (error.response?.status === 400 || error.response?.data?.message?.toLowerCase().includes('otp')) {
        setStep(1); // Go back to OTP if it was invalid
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!resetEmail) {
      toast.error('Session expired. Please request a new reset link.');
      navigate('/forgot-password');
      return;
    }
    try {
      setLoading(true);
      await forgotPassword({ email: resetEmail });
      toast.success('New OTP sent to your email');
      setTimeLeft(360); // Reset timer
      setStep(1); // Reset to Step 1
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-100 flex justify-center items-center bg-white h-screen">
        <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h2 className="text-2xl text-[#2D133A] font-bold mb-4">Success!</h2>
          <p className="text-[#665e6b] mb-8">Password changed successfully!</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium py-3 rounded-lg transition-all duration-300"
          >
            Redirect to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 flex justify-center items-center bg-white h-screen">
          <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-10">
            <div className="flex flex-col items-center jutify-center mb-10">
              <p className="text-2xl text-[#2D133A] font-medium mb-2">
                {step === 1 ? 'Verify OTP' : 'Reset your Password'}
              </p>
              <p className="text-sm text-[#665e6b] text-center">
                {step === 1
                  ? 'Enter the 6-digit code sent to your email.'
                  : 'Enter your new password below.'}
              </p>
            </div>

            <div className={`text-center mb-6 font-bold text-xl ${timeLeft < 60 ? 'text-red-500' : 'text-[#2D133A]'}`}>
              {formatTime(timeLeft)}
            </div>

            {timeLeft === 0 && (
              <p className="text-center text-red-500 text-sm mb-4 font-medium">
                OTP expired. Please request a new one.
              </p>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
              onSubmit={(values) => {
                if (step === 1) {
                  setStep(2);
                } else {
                  handleResetPassword(values);
                }
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="flex flex-col gap-4">
                  {step === 1 && (
                    <TextInput
                      label="OTP Code*"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength="6"
                    />
                  )}

                  {step === 2 && (
                    <>
                      <div className="relative">
                        <TextInput
                          label="New Password*"
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
                          label="Confirm New Password*"
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
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={timeLeft === 0 || !isValid || !dirty}
                    className={`mt-8 mb-6 rounded-lg h-11 text-white font-medium transition-all duration-300 ${timeLeft === 0 || !isValid || !dirty
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#BA9FFE] hover:bg-[#a37eff] box-shadow-style'
                      }`}
                  >
                    {step === 1 ? 'Proceed' : 'Reset Password'}
                  </button>

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-[#665e6b] font-medium hover:text-[#2D133A] mb-4"
                    >
                      Change OTP
                    </button>
                  )}
                </Form>
              )}
            </Formik>

            {(timeLeft === 0 || timeLeft <= 240) && (
              <div className="text-center mb-10">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm font-medium text-[#BA9FFE] hover:text-[#7e26aa] underline"
                >
                  Resend OTP
                </button>
              </div>
            )}

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
        </div>
      )}
    </>
  );
};

export default ResetPassword;
