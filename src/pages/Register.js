import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../common/form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { register } from "../services";
import Loader from "../components/Loader";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onSignUp, setOnSignUp] = useState(false);
  const [error, setError] = useState(null);
  const { storeAuthCookie } = useAuthContext();

  const initialValues = {
    fname: "",
    lname: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const phoneRegExp = /^\+[0-9]+$/;

  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(2, "Must be 5 characters or more")
      .required("Enter Full Name"),
    lname: Yup.string()
      .min(2, "Must be 5 characters or more")
      .required("Enter Full Name"),
    emailAddress: Yup.string()
      .email("Invalid Email Address")
      .required("Enter Email Address"),
    // altEmailAddress: Yup.string()
    //   .email('Must be a valid email address')
    //   .test(
    //     'is-different',
    //     'Must be different from the main email',
    //     function (value) {
    //       const mainEmail = this.parent.emailAddress;
    //       return value !== mainEmail;
    //     }
    //   ),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Must start with a valid country code")
      .min(10, "Too short")
      .max(15, "Too long")
      .required("Enter Phone Number"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Create a password"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    // acceptedTerms: Yup.boolean()
    //   .required('Accept terms and conditions')
    //   .oneOf([true], 'You must accept the terms and conditions.'),
  });

  const handleRegistration = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register({
        firstName: values.fname,
        lastName: values.lname,
        email: values.emailAddress,
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      storeAuthCookie(data);
      setOnSignUp(true);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : !onSignUp ? (
        <div className="w-100 bg-white ">
          <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
            <div className="flex flex-col items-center jutify-center mb-20">
              <p className="text-2xl text-[#2D133A] font-medium mb-2">
                Create your Account
              </p>
              <p className="text-[#665e6b] text-center font-normal">
                Embark on a journey of love, faith, and connection...
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4">
                {error}
              </div>
            )}

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
                <TextInput
                  label="Phone Number*"
                  name="phoneNumber"
                  type="text"
                />

                <div className="relative">
                  <TextInput
                    label="Password*"
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                    type={showConfirmPassword ? "text" : "password"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
              >
                Log in
              </Link>{" "}
            </p>
          </div>
        </div>
      ) : (
        <VerifyEmailScreen />
      )}
    </>
  );
};

export default Register;
