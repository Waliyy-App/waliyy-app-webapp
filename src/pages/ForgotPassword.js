import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services';
import Loader from '../components/Loader';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const initialValues = {
    emailAddress: '',
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email('Invalid Email Address')
      .required('Enter Email Address'),
  });

  const handleForgotPassword = async (values) => {
    setLoading(true);
    setSuccess(null)
    try {
      await forgotPassword({
        email: values.emailAddress,
      });

      console.log('success');
      setSuccess('Password reset email sent')
    } catch (error) {
      console.log(error)
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
                Forgot your password?
              </p>
              <p className="text-[#665e6b] text-center font-normal">
                Please enter the email address you would like your password
                information sent to...
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
                <TextInput
                  label="Email Address*"
                  name="emailAddress"
                  type="email"
                />

                <button
                  type="submit"
                  className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Request reset link
                </button>
              </Form>
            </Formik>

            <div className="w-full text-center">
              <Link
                className="text-sm font-medium text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300 flex items-center gap-2 justify-center"
                to="/"
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

export default ForgotPassword;
