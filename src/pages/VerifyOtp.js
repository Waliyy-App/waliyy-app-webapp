import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { verifyOtp, resendVerificationEmail } from "../services";

const getStoredEmail = () =>
	(
		localStorage.getItem("pendingVerificationEmail") ||
		localStorage.getItem("temp_email") ||
		""
	)
		.trim()
		.toLowerCase();

export default function VerifyOtp() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [resendEmail, setResendEmail] = useState(
		(location.state?.email || getStoredEmail()).trim().toLowerCase()
	);
	const [resendLoading, setResendLoading] = useState(false);
	const [resendError, setResendError] = useState("");
	const [cooldown, setCooldown] = useState(0);
	const resendButtonRef = useRef(null);

	useEffect(() => {
		if (cooldown <= 0) return;
		const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
		return () => clearTimeout(timer);
	}, [cooldown]);

	const initialValues = {
		otp: "",
	};

	const validationSchema = Yup.object({
		otp: Yup.string()
			.matches(/^\d{6}$/, "Enter the 6-digit code from your email")
			.required("Enter OTP"),
	});

	const handleOtpSubmit = async (values) => {
		setIsDisabled(true);
		try {
			const res = await verifyOtp({ otp: values?.otp });
			toast.success(res?.message || "Email verified successfully");
			localStorage.removeItem("pendingVerificationEmail");
			navigate("/verification-success");
		} catch (err) {
			const status = err.response?.status;
			const message = err.response?.data?.message || "";
			const expired = message.toLowerCase().includes("expired");

			if (status === 429) {
				toast.error(
					"Too many attempts. Please wait a few minutes and try again."
				);
			} else if (expired) {
				const expiredMessage =
					"That code has expired. Tap Resend Code below to get a new one.";
				setResendError(expiredMessage);
				setCooldown(0); // make sure Resend is immediately available
				toast.error(expiredMessage);
				requestAnimationFrame(() => {
					resendButtonRef.current?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
					resendButtonRef.current?.focus();
				});
			} else {
				toast.error(message || "Invalid OTP. Please check the code and try again.");
			}
		} finally {
			setIsDisabled(false);
		}
	};

	const handleResend = async () => {
		const email = (resendEmail || getStoredEmail()).trim().toLowerCase();
		if (!email) {
			toast.error("Please enter the email address you registered with.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}

		setResendLoading(true);
		setResendError("");
		try {
			await resendVerificationEmail(email);
			setResendEmail(email);
			localStorage.setItem("pendingVerificationEmail", email);
			toast.success(
				"Verification code resent. Check your inbox and spam folder."
			);
			setCooldown(60);
		} catch (err) {
			const status = err.response?.status;
			const message = err.response?.data?.message || "";
			let errorMessage;

			if (status === 429) {
				errorMessage =
					"Too many requests. Please wait a few minutes before trying again.";
			} else if (message.toLowerCase().includes("isemailverified")) {
				errorMessage =
					"We couldn't resend the code right now. Please check your spam/junk folder or contact support at waliyyapp@gmail.com.";
			} else {
				errorMessage =
					message || "Failed to resend verification code. Please try again.";
			}

			setResendError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setResendLoading(false);
		}
	};

	return (
		<div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
			<div className="flex flex-col items-center jutify-center mb-8">
				<p className="text-2xl text-[#2D133A] font-medium mb-2">Enter OTP</p>
				<p className="text-sm text-[#665e6b] text-center">
					{resendEmail
						? `Enter the 6-digit verification code sent to ${resendEmail}.`
						: "Enter the verification code sent to your email."}
				</p>
				<p className="text-xs text-[#665e6b] text-center mt-2">
					The code is valid for 30 minutes.
				</p>
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
									inputMode="numeric"
									autoComplete="one-time-code"
									maxLength={6}
									placeholder="123456"
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
							className="my-8 w-full hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{isSubmitting ? "Verifying..." : "Submit"}
						</button>
					</Form>
				)}
			</Formik>

			{/* Resend OTP Section */}
			<div className="border-t border-gray-100 pt-6 mt-2">
				<p className="text-sm text-[#665e6b] font-medium mb-3 text-center">
					Didn't receive the code?
				</p>
				<div className="flex flex-col gap-3">
					<input
						type="email"
						value={resendEmail}
						onChange={(e) => {
							setResendEmail(e.target.value);
							setResendError("");
						}}
						placeholder="Enter your email address"
						autoComplete="email"
						className="w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE] text-sm px-1"
					/>
					<button
						ref={resendButtonRef}
						type="button"
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
					{resendError && (
						<div className="text-center">
							<p className="text-xs text-red-500 leading-relaxed">
								{resendError}
							</p>
							<a
								href={`mailto:waliyyapp@gmail.com?subject=${encodeURIComponent(
									"Email verification help"
								)}&body=${encodeURIComponent(
									`I did not receive a verification code for ${
										resendEmail || "my account"
									}. Please help me verify my email.`
								)}`}
								className="text-xs text-[#7e26aa] underline"
							>
								Email support
							</a>
						</div>
					)}
				</div>
				<p className="text-xs text-[#665e6b] text-center mt-4 leading-relaxed">
					The code is sent to you by email from WaliyyApp. If you still
					don't see it, check your spam/junk folder or email{" "}
					<a
						href="mailto:waliyyapp@gmail.com"
						className="text-[#7e26aa] underline"
					>
						waliyyapp@gmail.com
					</a>
					.
				</p>
			</div>

			<div className="w-full text-center mt-8">
				<Link
					className="text-sm font-medium text-[#2D133A] hover:text-[#7e26aa] transition-all duration-300"
					to="/login"
				>
					Back to login
				</Link>
			</div>
		</div>
	);
}
