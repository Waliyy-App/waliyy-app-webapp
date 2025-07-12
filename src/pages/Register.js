import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { register } from '../services';
import Loader from '../components/Loader';

const maritalStatusOptions = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Separated', label: 'Separated' },
  { value: 'Widowed', label: 'Widowed' }
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

// Progress bar helper
const getProgress = (step, gender) => {
  // 4 steps for female, 4 steps for male
  // Step 1: Basic Info
  // Step 2: Marital Status
  // Step 3: Gender
  // Step 4: Password/Walliy
  let total = 4;
  let current = step;
  if (step > total) current = total;
  return Math.round((current / total) * 100);
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showWalliyPassword, setShowWalliyPassword] = useState(false);
  const [showWalliyConfirmPassword, setShowWalliyConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  // Step 1 Schema
  const step1Schema = Yup.object({
    fname: Yup.string().min(2, 'Must be 2 characters or more').required('Enter First Name'),
    lname: Yup.string().min(2, 'Must be 2 characters or more').required('Enter Last Name'),
    emailAddress: Yup.string().email('Invalid Email Address').required('Enter Email Address'),
  });

  // Step 2 Schema
  const step2Schema = Yup.object({
    maritalStatus: Yup.string().required('Select Marital Status'),
  });

  // Step 3 Schema
  const step3Schema = Yup.object({
    gender: Yup.string().required('Select Gender'),
  });

  // Step 4 Male Schema
  const step4MaleSchema = Yup.object({
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Create a password'),
    confirmPassword: Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Passwords do not match'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
  });

  // Step 4 Female (Walliy) Schema
  const step4FemaleSchema = Yup.object({
    walliyName: Yup.string().min(2, 'Must be 2 characters or more').required('Enter Walliy’s Name'),
    walliyEmail: Yup.string().email('Invalid Email Address').required('Enter Walliy’s Email'),
    walliyPassword: Yup.string().min(8, 'Must be 8 characters or more').required('Create a password'),
    walliyConfirmPassword: Yup.string().required('Confirm your password').oneOf([Yup.ref('walliyPassword')], 'Passwords do not match'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
  });

  const handleNext = (values) => {
    setFormValues({ ...formValues, ...values });
    setStep(step + 1);
  };

  const handleMaritalStatus = (values) => {
    if (values.maritalStatus === 'Married') {
      toast.info('This app is intended only for unmarried users.');
      navigate('/');
      return;
    }
    handleNext(values);
  };

  const handleRegistration = async (values) => {
    setLoading(true);
    try {
      let payload;
      if (formValues.gender === 'Male') {
        payload = {
          firstName: formValues.fname,
          lastName: formValues.lname,
          email: formValues.emailAddress,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
      } else {
        payload = {
          firstName: formValues.fname,
          lastName: formValues.lname,
          email: formValues.emailAddress,
          walliyName: values.walliyName,
          walliyEmail: values.walliyEmail,
          walliyPassword: values.walliyPassword,
          walliyConfirmPassword: values.walliyConfirmPassword,
        };
      }
      // Accept terms is in both payloads
      payload.acceptTerms = values.acceptTerms;

      const data = await register(payload);
      toast.success(data?.message);
      navigate('/verify-email');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  // Progress bar rendering
  const progress = getProgress(step, formValues.gender);

  return (
    <div className="w-100 bg-white">
      <div className="w-[360px] sm:w-[480px] px-5 sm:px-0 mx-auto py-24">
        <div className="flex flex-col items-center jutify-center mb-20">
          <p className="text-2xl text-center text-[#2D133A] font-medium mb-8">
            Create your Account - Embark on a journey of love, faith, and connection...
          </p>
          <div className="flex flex-col gap-2 bg-[#c9b3ff] text-[#2D133A] p-6 text-xl rounded">
            <p className="font-bold">
              *SISTERS - Register with your Mahram's details, this is the information that will be sent to Brothers interested in you.
            </p>
            <p className="font-bold">*BROTHERS - Register with your details.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-[#2D133A]">Step {step} of 4</span>
            <span className="text-xs font-medium text-[#2D133A]">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#BA9FFE] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <Formik
            initialValues={{ fname: '', lname: '', emailAddress: '' }}
            validationSchema={step1Schema}
            onSubmit={handleNext}
          >
            {() => (
              <Form className="flex flex-col gap-5">
                <TextInput label="First Name*" name="fname" type="text" />
                <TextInput label="Last Name*" name="lname" type="text" />
                <TextInput label="Email Address*" name="emailAddress" type="email" />
                <button
                  type="submit"
                  className="my-6 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <Formik
            initialValues={{ maritalStatus: '' }}
            validationSchema={step2Schema}
            onSubmit={handleMaritalStatus}
          >
            {({ values, handleChange }) => (
              <Form className="flex flex-col gap-5">
                <label className="font-medium text-[#2D133A] mb-2">Marital Status*</label>
                <div className="flex flex-col gap-2">
                  {maritalStatusOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="maritalStatus"
                        value={option.value}
                        checked={values.maritalStatus === option.value}
                        onChange={() => handleChange({ target: { name: 'maritalStatus', value: option.value } })}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="my-6 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 3 && (
          <Formik
            initialValues={{ gender: '' }}
            validationSchema={step3Schema}
            onSubmit={handleNext}
          >
            {({ values, handleChange }) => (
              <Form className="flex flex-col gap-5">
                <label className="font-medium text-[#2D133A] mb-2">Gender*</label>
                <div className="flex flex-col gap-2">
                  {genderOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="gender"
                        value={option.value}
                        checked={values.gender === option.value}
                        onChange={() => handleChange({ target: { name: 'gender', value: option.value } })}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="my-6 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Step 4 for Male */}
        {step === 4 && formValues.gender === 'Male' && (
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
              acceptTerms: false,
            }}
            validationSchema={step4MaleSchema}
            onSubmit={handleRegistration}
          >
            {({ values, handleChange, errors, touched }) => (
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

                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={values.acceptTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#BA9FFE] bg-gray-100 border-gray-300 rounded focus:ring-[#BA9FFE]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="acceptTerms" className="text-[#2D133A]">
                      I agree to the{' '}
                      <Link
                        to="/terms"
                        className="font-medium text-[#7e26aa] hover:underline"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                    {errors.acceptTerms && touched.acceptTerms && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.acceptTerms}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="my-6 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Create account
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Step 4 for Female */}
        {step === 4 && formValues.gender === 'Female' && (
          <Formik
            initialValues={{
              walliyName: '',
              walliyEmail: '',
              walliyPassword: '',
              walliyConfirmPassword: '',
              acceptTerms: false,
            }}
            validationSchema={step4FemaleSchema}
            onSubmit={handleRegistration}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form className="flex flex-col gap-5">
                <TextInput label="Walliy’s Name*" name="walliyName" type="text" />
                <TextInput label="Walliy’s Email*" name="walliyEmail" type="email" />
                <div className="relative">
                  <TextInput
                    label="Walliy’s Password*"
                    name="walliyPassword"
                    type={showWalliyPassword ? 'text' : 'password'}
                  />
                  <div
                    onClick={() => setShowWalliyPassword(!showWalliyPassword)}
                    className="absolute right-1 cursor-pointer top-10"
                  >
                    {showWalliyPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="relative">
                  <TextInput
                    label="Confirm Password*"
                    name="walliyConfirmPassword"
                    type={showWalliyConfirmPassword ? 'text' : 'password'}
                  />
                  <div
                    onClick={() => setShowWalliyConfirmPassword(!showWalliyConfirmPassword)}
                    className="absolute right-1 cursor-pointer top-10"
                  >
                    {showWalliyConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={values.acceptTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#BA9FFE] bg-gray-100 border-gray-300 rounded focus:ring-[#BA9FFE]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="acceptTerms" className="text-[#2D133A]">
                      I agree to the{' '}
                      <Link
                        to="/terms"
                        className="font-medium text-[#7e26aa] hover:underline"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                    {errors.acceptTerms && touched.acceptTerms && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.acceptTerms}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="my-6 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Create account
                </button>
              </Form>
            )}
          </Formik>
        )}

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