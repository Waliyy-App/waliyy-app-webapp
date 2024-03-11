import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../common/form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SplashScreen from "../screens/SplashScreen";
import { login } from "../services";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { storeAuthCookie } = useAuthContext();

  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid Email Address")
      .required("Enter email address"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Enter password"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({
        email: values.emailAddress,
        password: values.password,
      });

      if (data) {
        storeAuthCookie(data);
      }
      
      setLoggedIn(true);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 bg-white ">
      {loading ? (
        <Loader />
      ) : !loggedIn ? (
        <div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
          <div className="flex flex-col items-center jutify-center mb-20">
            <p className="text-2xl text-[#2D133A] font-medium mb-2">
              Welcome Back
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
            onSubmit={(values) => handleLogin(values)}
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
                  type={showPassword ? "text" : "password"}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-10 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <Link
                className="text-end text-sm font-medium text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
                to="/forgot-password"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
              >
                Sign In
              </button>
            </Form>
          </Formik>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-bold text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      ) : (
        <SplashScreen />
      )}
    </div>
  );
};

export default Login;
