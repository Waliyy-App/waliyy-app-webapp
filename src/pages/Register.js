import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { getUsersCount, register } from '../services';
import Loader from '../components/Loader';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [count, setCount] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    fname: '',
    lname: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  const phoneRegExp = /^\+[0-9]+$/;

  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(2, 'Must be 5 characters or more')
      .required('Enter Full Name'),
    lname: Yup.string()
      .min(2, 'Must be 5 characters or more')
      .required('Enter Full Name'),
    emailAddress: Yup.string()
      .email('Invalid Email Address')
      .required('Enter Email Address'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Must start with a valid country code')
      .min(10, 'Too short')
      .max(15, 'Too long')
      .required('Enter Phone Number'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Create a password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  // useEffect(() => {
  //   const showCounter = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getUsersCount();
  //       setCount(data.data);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   showCounter();
  // }, []);

  // const newCount = 100 - count;

  const handleRegistration = async (values) => {
    setLoading(true);
    try {
      const data = await register({
        firstName: values.fname,
        lastName: values.lname,
        email: values.emailAddress,
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success(data?.message);
      navigate('/verify-email');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-100 bg-white">
      <div className="w-[360px] sm:w-[480px] px-5 sm:px-0 mx-auto py-24">
        <div className="bg-[#6d2f8d] text-white py-6 px-4 rounded mb-8">
          <p className="font-bold text-center">
            100 free subscriptions complete!!!
          </p>
        </div>
        <div className="flex flex-col items-center jutify-center mb-20">
          <p className="text-2xl text-center text-[#2D133A] font-medium mb-8">
            Create your Account - Embark on a journey of love, faith, and
            connection...
          </p>
          <div className="flex flex-col gap-2 bg-[#c9b3ff] text-[#2D133A] p-6 text-xl rounded">
            <p className="font-bold">
              *SISTERS - Register with your Mahram's details, this is the
              information that will be sent to Brothers interested in you.
            </p>
            <p className="font-bold">*BROTHERS - Register with your details.</p>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleRegistration(values)}
        >
          <Form className="flex flex-col gap-5">
            <TextInput label="First Name*" name="fname" type="text" />
            <TextInput label="Last Name*" name="lname" type="text" />
            <TextInput
              label="Email Address*"
              name="emailAddress"
              type="email"
            />
            <TextInput label="Phone Number*" name="phoneNumber" type="text" />

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
              Create account
            </button>
          </Form>
        </Formik>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
          >
            Log in
          </Link>{' '}
        </p>

        <p className="text-center text-sm">
          Back to the{' '}
          <Link
            to="/"
            className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
          >
            Website
          </Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Register;
