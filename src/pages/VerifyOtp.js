import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { verifyOtp, resendVerificationEmail } from "../services";

export default function VerifyOtp() {
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);
	const [resendEmail, setResendEmail] = useState("");
	const [resendLoading, setResendLoading] = useState(false);
	const [cooldown, setCooldown] = useState(0);

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
			navigate("/verification-success");
		} catch (err) {
			toast.error(err.response?.data?.message || "Invalid or expired OTP");
		} finally {
			setIsDisabled(false);
		}
	};

	const handleResend = async () => {
		if (!resendEmail) {
			toast.error("Please enter your email address to resend the code.");
			return;
		}
		setResendLoading(true);
		try {
			await resendVerificationEmail(resendEmail);
			toast.success("Verification code resent! Check your email.");
			// Start 60s cooldown
			setCooldown(60);
			const timer = setInterval(() => {
				setCooldown((prev) => {
					if (prev <= 1) { clearInterval(timer); return 0; }
					return prev - 1;
				});
			}, 1000);
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to resend verification code.");
		} finally {
			setResendLoading(false);
		}
	};

	return (
		<div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
			<div className="flex flex-col items-center jutify-center mb-8">
				<p className="text-2xl text-[#2D133A] font-medium mb-2">Enter OTP</p>
				<p className="text-sm text-[#665e6b] text-center">Enter the verification code sent to your email.</p>
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
							className="my-8 w-full hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
						>
							{isSubmitting ? "Verifying..." : "Submit"}
						</button>
					</Form>
				)}
			</Formik>

			{/* Resend OTP Section */}
			<div className="border-t border-gray-100 pt-6 mt-2">
				<p className="text-sm text-[#665e6b] font-medium mb-3 text-center">Didn't receive the code?</p>
				<div className="flex flex-col gap-3">
					<input
						type="email"
						value={resendEmail}
						onChange={(e) => setResendEmail(e.target.value)}
						placeholder="Enter your email address"
						className="w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE] text-sm px-1"
					/>
					<button
						onClick={handleResend}
						disabled={resendLoading || cooldown > 0}
						className="w-full h-11 rounded-lg border border-[#BA9FFE] text-[#BA9FFE] font-medium text-sm hover:bg-[#f5f0ff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{resendLoading
							? "Sending..."
							: cooldown > 0
							? `Resend in ${cooldown}s`
							: "Resend Code"}
					</button>
				</div>
			</div>
		</div>
	);
}

