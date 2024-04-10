import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { FiCheck } from "react-icons/fi";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";
import { getPlans, makePayment } from "../services/index.js";
import { useAuthContext } from "../context/AuthContext.js";
import Loader from "../components/Loader.js";

const PricingPage = () => {
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [loading, setLoading] = useState(false);
	const [plans, setPlans] = useState([]);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handlePlans = async () => {
			setLoading(true);
			try {
				const res = await getPlans();
				setPlans(res.data);
				console.log(res.data); // Log the fetched data, not the state variable plans
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		handlePlans();
	}, []);

	const handlePayment = async (price) => {
		setLoading(true);
		try {
			const res = await makePayment(
				{
					amount: price,
				},
				token,
				childId
			);
			console.log(res);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row">
			<SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
			<MobileTopNav />
			<main
				className={`${
					isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
				} flex-1 overflow-y-auto py-[64px] px-8 transition-all duration-300`}
			>
				{loading ? (
					<Loader />
				) : (
					<React.Fragment>
						<div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
							<p className="text-[#BA9FFE] font-bold">Pricing</p>
							<p className="text-[#2D133A] font-bold text-4xl">
								You are a step away from finding your future spouse.
							</p>
						</div>
						<div className="flex flex-wrap items-center justify-center gap-8">
							<div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
								<div className="flex flex-col gap-2 items-center">
									<p className="text-xl text-[#2D133A] font-bold">Free plan</p>
									<p className="text-4xl text-[#2D133A] font-bold">₦0/annum</p>
									<p className="text-[#667085]">Our most popular plan.</p>
								</div>

								<div className="flex flex-col pt-8 pb-10 gap-4">
									<div className="flex items-center gap-3">
										<div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
											<FiCheck className="text-[#2D133A]" />
										</div>
										<p className="text-[#667085]">View profiles</p>
									</div>

									<div className="flex items-center gap-3">
										<div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
											<FiCheck className="text-[#2D133A]" />
										</div>
										<p className="text-[#667085]">Receive likes from others</p>
									</div>
								</div>

								<button
									disabled
									className="w-full border text-[#2D133A] font-semibold border-[#2D133A] h-12 rounded-lg"
								>
									Current Plan
								</button>
							</div>

							{plans.map((plan, index) => (
								<div
									className="w-[400px] bg-[#F9FAFB] rounded-lg p-8"
									key={index}
								>
									<div className="flex flex-col gap-2 items-center">
										<p className="text-xl text-[#2D133A] font-bold">
											{plan.planName} plan
										</p>
										<p className="text-4xl text-[#2D133A] font-bold">
											₦{plan.amount}/annum
										</p>
										<p className="text-[#667085]">
											Do so much more than just browsing.
										</p>
									</div>

									<div className="flex flex-col pt-8 pb-10 gap-4">
										{plan.planDescription
											.trim()
											.split("\n")
											.map((line, index) => (
												<div key={index} className="flex items-center gap-3">
													<div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
														<FiCheck className="text-[#2D133A]" />
													</div>
													<p className="text-[#667085]">{line.trim()}</p>
												</div>
											))}
									</div>

									<button
										className="w-full text-white font-semibold hover:bg-[#a37eff] bg-[#BA9FFE] h-12 rounded-lg transition-all duration-300"
										onClick={() => handlePayment(plan.amount)}
									>
										Get started
									</button>
								</div>
							))}
						</div>
					</React.Fragment>
				)}
			</main>
			<MobileNav />
		</div>
	);
};

export default PricingPage;
