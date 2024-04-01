import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClapLogo from "../assets/illustrations/clap.png";

const VerifyEmailScreen = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate("/login");
		}, 5000);
		return () => clearTimeout(timeoutId);
	});

	return (
		<div className="w-100 h-screen bg-white flex flex-col items-center justify-center">
			<div className="w-[360px] mx-auto ">
				<img src={ClapLogo} alt="." className="w-[200px] h-[200px] mx-auto" />
				<div className="flex flex-col items-center jutify-center mt-8">
					<p className="text-2xl text-[#2D133A] font-medium mb-3">
						Congratulations!!!
					</p>
					<p className="text-[#665e6b] text-center font-normal">
						To get started, verify your email address by clicking the link in
						the email we've sent you.
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailScreen;
