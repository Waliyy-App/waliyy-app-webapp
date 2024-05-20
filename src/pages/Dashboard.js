import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { useAuthContext } from "../context/AuthContext.js";
import { getRecommedations } from "../services/index.js";
import Loader from "../components/Loader.js";

const Dashboard = () => {
	const PAGE_NUMBER = 12;

	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [loading, setLoading] = useState(false);
	const [recommedations, setRecommendations] = useState([]);
	const [currRecommendations, setCurrRecommendations] = useState([]);
	const [endPage, setEndPage] = useState(PAGE_NUMBER);
	const [pageStart, setPageStart] = useState(0);
	const { token } = useAuthContext();

	const childId = localStorage.getItem("childId");
	const usersLength = recommedations?.length;

	useEffect(() => {
		const getSuitors = async () => {
			setLoading(true);
			try {
				const res = await getRecommedations(childId, token);
				setRecommendations(res?.data);
			} catch (error) {
				toast.error(error.response.data.message);
			} finally {
				setLoading(false);
			}
		};

		getSuitors();
	}, [token, childId]);

	useEffect(() => {
		setCurrRecommendations(() => {
			const curr = recommedations?.slice(pageStart, endPage);
			return curr;
		});
	}, [recommedations, pageStart, endPage]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	function handlePrev() {
		if (pageStart === 0) return;
		setPageStart((prev) => prev - PAGE_NUMBER);
		setEndPage((prev) => prev - PAGE_NUMBER);
	}

	function handleNext() {
		if (endPage < usersLength) {
			setPageStart((prev) => prev + PAGE_NUMBER);
			setEndPage((prev) => prev + PAGE_NUMBER);
		}
	}

	return (
		<div className="flex flex-col sm:flex-row">
			<SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
			<MobileTopNav />
			<main
				className={`${
					isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
				} py-[64px] px-8 w-full transition-all duration-300`}
			>
				{loading ? (
					<Loader />
				) : (
					<React.Fragment>
						<div className="flex justify-end py-8">
							<Link to="/filter">
								<HiOutlineAdjustmentsHorizontal className="h-8 w-8" />
							</Link>
						</div>
						<div className="flex flex-col gap-y-8">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{currRecommendations?.map((items) => (
									<ProfileCard
										key={items.id}
										id={items.id}
										age={items.age}
										lga={items.lga}
										firstName={items.firstName}
										residence={items.countryofResidence}
										about={items.about}
										profession={items.profession}
										gender={items.gender}
									/>
								))}
							</div>
							<div className="self-end flex items-center gap-x-4">
								<button
									onClick={handlePrev}
									disabled={pageStart === 0}
									className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
								>
									Prev
								</button>
								<button
									onClick={handleNext}
									disabled={usersLength === endPage}
									className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
								>
									Next
								</button>
							</div>
						</div>
					</React.Fragment>
				)}
			</main>
			<MobileNav />
		</div>
	);
};

export default Dashboard;
