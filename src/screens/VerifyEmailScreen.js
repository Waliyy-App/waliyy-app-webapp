import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClapLogo from "../assets/illustrations/clap.png";

const VerifyEmailScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const email = (
		location.state?.email ||
		localStorage.getItem("pendingVerificationEmail") ||
		localStorage.getItem("temp_email") ||
		""
	)
		.trim()
		.toLowerCase();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate("/verify-otp", { state: { email } });
		}, 7000);
		return () => clearTimeout(timeoutId);
	}, [email, navigate]);

	return (
		<div className="w-100 h-screen bg-white flex flex-col items-center justify-center">
			<div className="w-[360px] mx-auto ">
				<img src={ClapLogo} alt="." className="w-[200px] h-[200px] mx-auto" />
				<div className="flex flex-col items-center jutify-center mt-8">
					<p className="text-3xl text-[#2D133A] font-medium mb-3">
						Congratulations!!!
					</p>
					<p className="text-[#665e6b] text-center font-semibold text-xl">
						To get started, verify your email address by entering the{" "}
						<strong>OTP</strong> we sent{email ? ` to ${email}` : ""}. If you
						don't see it, check your spam/junk folder.
					</p>
					<p className="text-xs text-[#665e6b] text-center mt-2">
						The code is valid for 30 minutes.
					</p>
					<Link
						to="/verify-otp"
						state={{ email }}
						className="mt-8 px-6 py-3 rounded-lg bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium transition-all duration-300"
					>
						Enter OTP now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailScreen;
