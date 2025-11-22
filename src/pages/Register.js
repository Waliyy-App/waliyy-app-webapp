import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../common/form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { register } from '../services';
import Loader from '../components/Loader';

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    fname: '',
    lname: '',
    emailAddress: '',
    maritalStatus: '',
    gender: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    acceptTerms: false,
    walliyName: '',
    walliyEmail: '',
    walliyPassword: '',
    walliyConfirmPassword: '',
  };

  // Validation schemas
  const step1Validation = Yup.object({
    fname: Yup.string().min(2, 'Must be 2 characters or more').required('Enter First Name'),
    lname: Yup.string().min(2, 'Must be 2 characters or more').required('Enter Last Name'),
    emailAddress: Yup.string().email('Invalid Email Address').required('Enter Email Address'),
  });

  const step2Validation = Yup.object({
    maritalStatus: Yup.string().required('Please select your marital status'),
  });

  const step3Validation = Yup.object({
    gender: Yup.string().required('Please select your gender'),
  });

  const step4Validation = Yup.object({
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Create a password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  const step5Validation = Yup.object({
    walliyName: Yup.string().required("Walliy's name is required"),
    walliyEmail: Yup.string().email('Invalid Email Address').required("Walliy's email is required"),
    walliyPassword: Yup.string().min(8, 'Must be 8 characters or more').required('Create a password for Walliy'),
    walliyConfirmPassword: Yup.string()
      .required('Confirm Walliy password')
      .oneOf([Yup.ref('walliyPassword')], 'Passwords do not match'),
    phoneNumber: Yup.string().required('Phone number is required'), // female's phone
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  const getValidationSchema = (values) => {
    switch(step) {
      case 1: return step1Validation;
      case 2: return step2Validation;
      case 3: return step3Validation;
      case 4: return step4Validation;
      case 5: return step5Validation;
      default: return step1Validation;
    }
  };

  const handleRegistration = async (values) => {
    setLoading(true);
    try {
      let data;

     if (values.gender === 'Male') {
  data = await register({
    firstName: values.fname,
    lastName: values.lname,
    email: values.emailAddress,
    password: values.password,
    confirmPassword: values.confirmPassword,
    gender: values.gender,
    maritalStatus: values.maritalStatus,
    phoneNumber: values.phoneNumber,
    acceptTerms: values.acceptTerms,   // ✅ ADD THIS
  });
} else {
  data = await register({
    firstName: values.walliyName,
    // lastName: '',
    email: values.walliyEmail,
    password: values.walliyPassword,
    confirmPassword: values.walliyConfirmPassword,
    gender: values.gender,
    maritalStatus: values.maritalStatus,
    phoneNumber: values.phoneNumber,
    acceptTerms: values.acceptTerms,   // already here
    femaleUser: {
      firstName: values.fname,
      lastName: values.lname,
      email: values.emailAddress,
    },
  });
}
      toast.success(data?.message || 'Account created successfully');
      navigate('/verify-email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const NextButton = () => {
    const { validateForm, values } = useFormikContext();

    const handleNext = async () => {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) return;

      if (step === 2 && values.maritalStatus === 'Married') {
        toast.error('This app is intended only for unmarried users.');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      if (step === 3) {
        setStep(values.gender === 'Male' ? 4 : 5);
        return;
      }

      setStep(step + 1);
    };

    return (
      <button
        type="button"
        onClick={handleNext}
        className="my-6 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 px-6 text-white font-medium box-shadow-style transition-all duration-300"
      >
        Next
      </button>
    );
  };

  const BackButton = () => (
    <button
      type="button"
      onClick={() => setStep(step - 1)}
      className="mr-4 my-6 hover:bg-gray-200 px-6  bg-gray-100 rounded-lg h-11 text-[#2D133A] font-medium box-shadow-style transition-all duration-300"
    >
      Back
    </button>
  );

  if (loading) return <Loader />;

  return (
    <div className="w-100 bg-white">
      <div className="w-[360px] sm:w-[480px] px-5 sm:px-0 mx-auto py-12">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-2xl text-center text-[#2D133A] font-bold mb-4">
            Create your Account
          </h2>
          <div className="flex gap-2 mb-6">
            {[1,2,3,4,5].map(num => (
              <div key={num} className={`w-8 h-2 rounded-full ${step >= num ? 'bg-[#BA9FFE]' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.lazy((values) => getValidationSchema(values))}
          onSubmit={handleRegistration}
        >
          {({ errors, touched, values, handleChange, isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <TextInput label="First Name*" name="fname" type="text" />
                  <TextInput label="Last Name*" name="lname" type="text" />
                  <TextInput label="Email Address*" name="emailAddress" type="email" />
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <label className="text-[#2D133A] font-medium">Marital Status*</label>
                  {['Single','Married','Divorced','Separated','Widowed'].map(status => (
                    <div key={status} className="flex items-center">
                      <input type="radio" id={status} name="maritalStatus" value={status} checked={values.maritalStatus===status} onChange={handleChange} className="w-4 h-4 text-[#BA9FFE] focus:ring-[#BA9FFE]" />
                      <label htmlFor={status} className="ml-2 text-[#2D133A]">{status}</label>
                    </div>
                  ))}
                  {errors.maritalStatus && touched.maritalStatus && (
                    <div className="text-red-600 text-sm">{errors.maritalStatus}</div>
                  )}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <label className="text-[#2D133A] font-medium">Gender*</label>
                  {['Male','Female'].map(gender => (
                    <div key={gender} className="flex items-center">
                      <input type="radio" id={gender} name="gender" value={gender} checked={values.gender===gender} onChange={handleChange} className="w-4 h-4 text-[#BA9FFE] focus:ring-[#BA9FFE]" />
                      <label htmlFor={gender} className="ml-2 text-[#2D133A]">{gender}</label>
                    </div>
                  ))}
                  {errors.gender && touched.gender && <div className="text-red-600 text-sm">{errors.gender}</div>}
                </div>
              )}

              {/* Step 4: Password & Phone */}
              {step === 4 && (
                <>
                  <TextInput label="Phone Number*" name="phoneNumber" type="text" />

                  <div className="relative">
                    <TextInput label="Password*" name="password" type={showPassword ? 'text' : 'password'} />
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

                  <div className="flex items-start mt-2">
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
                        <Link to="/terms" className="font-medium text-[#7e26aa] hover:underline">
                          Terms and Conditions
                        </Link>
                      </label>
                      {errors.acceptTerms && touched.acceptTerms && (
                        <div className="text-red-600 text-sm mt-1">{errors.acceptTerms}</div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Step 5: Female Walliy */}
              {step === 5 && (
                <>
                  <TextInput label="Phone Number*" name="phoneNumber" type="text" />
                  <TextInput label="Walliy's Full Name*" name="walliyName" type="text" />
                  <TextInput label="Walliy's Email*" name="walliyEmail" type="email" />
                  <div className="relative">
                    <TextInput label="Walliy's Password*" name="walliyPassword" type={showPassword?'text':'password'} />
                    <div onClick={()=>setShowPassword(!showPassword)} className="absolute right-1 cursor-pointer top-10">{showPassword ? <FaEyeSlash/>:<FaEye/>}</div>
                  </div>
                  <div className="relative">
                    <TextInput label="Confirm Walliy's Password*" name="walliyConfirmPassword" type={showConfirmPassword?'text':'password'} />
                    <div onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute right-1 cursor-pointer top-10">{showConfirmPassword ? <FaEyeSlash/>:<FaEye/>}</div>
                  </div>
                  <div className="flex items-start mt-2">
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
                        <Link to="/terms" className="font-medium text-[#7e26aa] hover:underline">
                          Terms and Conditions
                        </Link>
                      </label>
                      {errors.acceptTerms && touched.acceptTerms && (
                        <div className="text-red-600 text-sm mt-1">{errors.acceptTerms}</div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex mt-4">
                {step>1 && step<4 && <BackButton />}
                {step<4 && <NextButton />}
                {(step===4 || step===5) && (
                  <button type="submit" disabled={isSubmitting} className="flex-1 my-6 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300">
                    Create Account
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300">
            Log in
          </Link>
        </p>
        <p className="text-center text-sm mt-2">
          Back to the{' '}
          <Link to="/" className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300">
            Website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
