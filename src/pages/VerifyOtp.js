import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { verifyOtp } from "../services";

export default function VerifyOtp() {
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);

	const initialValues = {
		otp: "",
	};

	const validationSchema = Yup.object({
		otp: Yup.string()
			.min(6, "Must be 6 characters or more")
			.required("Enter OTP"),
	});

	const handleOtpSubmit = async (values) => {
		setIsDisabled(true);
		try {
			const res = await verifyOtp({ otp: values?.otp });
			toast.success(res.message);
			navigate("/login");
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
			<div className="flex flex-col items-center jutify-center mb-20">
				<p className="text-2xl text-[#2D133A] font-medium mb-2">Enter OTP</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleOtpSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="flex flex-col w-full relative">
							<label
								className="text-sm font-medium mb-2 text-[#2D133A]"
								htmlFor="otp"
							>
								OTP
							</label>
							<div className="w-full">
								<Field
									name="otp"
									type="text"
									className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
								/>
								<ErrorMessage
									name="otp"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
						</div>
						<button
							type="submit"
							disabled={isDisabled || isSubmitting}
							className="my-11 w-full mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
						>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
