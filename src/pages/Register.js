import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../common/form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

import { register } from "../services";
import Loader from "../components/Loader";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    fname: "",
    lname: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false, // Added for terms acceptance
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
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Must start with a valid country code")
      .min(10, "Too short")
      .max(15, "Too long")
      .required("Required"),
    gender: Yup.string()
      .oneOf(["FEMALE", "MALE"], "Invalid Gender")
      .required("Select Gender"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Create a password"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    acceptTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions") // Require checkbox to be checked
      .required("You must accept the terms and conditions"),
  });

  async function checkEmail(email) {
    try {
      const response = await axios.get(
        `https://fakefilter.net/api/is/fakeemail/${email}`
      );
      const result = response?.data;

      if (result?.isFakeDomain === false) {
        return false; // allow signup
      }

      return true; // block signup
    } catch (error) {
      console.error("Email validation error:", error.message || error);
      throw new Error("Could not validate email");
    }
  }

  const handleRegistration = async (values) => {
    setLoading(true);
    try {
      const invalidEmail = await checkEmail(values.emailAddress);
      if (!invalidEmail) {
        const data = await register({
          firstName: values.fname,
          lastName: values.lname,
          email: values.emailAddress,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        localStorage.setItem("temp_gender", values.gender);
        localStorage.setItem("temp_phone", values.phoneNumber);
        toast.success(data?.message);
        navigate("/verify-email");
      } else {
        toast.error("Invalid email. Please use a standard email.");
      }
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
        <div className="flex flex-col items-center jutify-center mb-20">
          <p className="text-2xl text-center text-[#2D133A] font-medium mb-8">
            Create your Account - Embark on a journey of love, faith, and
            connection...
          </p>
          <div className="flex flex-col gap-2 bg-[#c9b3ff] text-[#2D133A] p-6 text-xl rounded">
            <p className="font-bold">
              *SISTERS - Register with your email address and your Wali/Mahram's
              phone number. You will provide your Wali's name and email after verification.
            </p>
            <p className="font-bold">*BROTHERS - Register with your own details.</p>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleRegistration(values)}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="flex flex-col gap-5">
              <TextInput label="First Name*" name="fname" type="text" />
              <TextInput label="Last Name*" name="lname" type="text" />
              <TextInput
                label="Email Address*"
                name="emailAddress"
                type="email"
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#2D133A]">Gender*</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="MALE"
                      checked={values.gender === "MALE"}
                      onChange={handleChange}
                      className="accent-[#BA9FFE]"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      checked={values.gender === "FEMALE"}
                      onChange={handleChange}
                      className="accent-[#BA9FFE]"
                    />
                    Female
                  </label>
                </div>
                {errors.gender && touched.gender && (
                  <div className="text-red-600 text-xs">{errors.gender}</div>
                )}
              </div>
              <TextInput
                label={values.gender === "FEMALE" ? "Wali/Mahram Phone Number*" : "Phone Number*"}
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

              {/* Terms and Conditions Checkbox */}
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
                    I agree to the{" "}
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

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
          >
            Log in
          </Link>{" "}
        </p>

        <p className="text-center text-sm">
          Back to the{" "}
          <Link
            to="/"
            className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
          >
            Website
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;