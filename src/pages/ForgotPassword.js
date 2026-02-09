import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TextInput } from "../common/form";
import { forgotPassword } from "../services";
import Loader from "../components/Loader";

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const initialValues = {
		email: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Enter Email Address"),
	});

	const handleForgotPassword = async (values) => {
		try {
			setLoading(true);
			const res = await forgotPassword({
				email: values.email,
			});
			toast.success(res?.message);
			localStorage.setItem('resetEmail', values.email);
			navigate("/reset-password");
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

						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={(values) => handleForgotPassword(values)}
						>
							<Form className="flex flex-col gap-5">
								<TextInput label="Email Address*" name="email" type="email" />

								<button
									type="submit"
									className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
								>
									Request reset token
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
				</div>
			)}
		</>
	);
};

export default ForgotPassword;
