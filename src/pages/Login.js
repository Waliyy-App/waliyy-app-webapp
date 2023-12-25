import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../utils/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SplashScreen from './SplashScreen';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const initialValues = {
    emailAddress: '',
    password: '',
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email('Invalid Email Address')
      .required('Enter email address'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Enter password'),
  });

  return (
    <div className="w-100 bg-white ">
      {!loggedIn && (
        <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
          <div className="flex flex-col items-center jutify-center mb-20">
            <p className="text-2xl text-[#2D133A] font-medium mb-2">
              Welcome Back
            </p>
            <p className="text-[#665e6b] text-center font-normal">
              Embark on a journey of love, faith, and connection...
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
              setLoggedIn(true);
            }}
          >
            <Form className="flex flex-col gap-5">
              <TextInput
                label="Email Address*"
                name="emailAddress"
                type="email"
              />

              <div className="relative">
                <TextInput
                  label="Password*"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-10 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <Link
                className="text-end text-sm font-medium text-[#2D133A] hover:text-[#7e26aa]"
                to="/"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="my-11 mb-16 hover:bg-[#9b84d3] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style"
              >
                Sign In
              </button>
            </Form>
          </Formik>

          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-[#2D133A] hover:text-[#7e26aa]"
            >
              Sign Up
            </Link>{' '}
          </p>
        </div>
      )}

      {loggedIn && <SplashScreen />}
    </div>
  );
};

export default Login;
