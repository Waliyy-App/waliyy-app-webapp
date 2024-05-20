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
import { getChild, getRecommedations } from "../services/index.js";
import Loader from "../components/Loader.js";

const Dashboard = () => {
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [child, setChild] = useState({});
	const [loading, setLoading] = useState(false);
	const [recommedations, setRecommendations] = useState([]);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");
	//   const user = localStorage.getItem('user');

	//   const userObj = JSON.parse(user);

	console.log(child);

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
		async function getChildDetails() {
			setLoading(true);
			try {
				const res = await getChild(childId, token);
				setChild(res?.data);
			} catch (err) {
				throw new Error(err);
			} finally {
				setLoading(false);
			}
		}

		getChildDetails();
	}, [childId, token]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
						<div className="flex justify-between items-center py-8 text-[#2D133A] sticky top-0 bg-white z-[100]">
							<p className=" text-3xl font-semibold">{child?.firstName}</p>
							<Link to="/filter">
								<HiOutlineAdjustmentsHorizontal className="h-8 w-8" />
							</Link>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{recommedations?.map((items) => (
								<ProfileCard
									state="dashboard"
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
					</React.Fragment>
				)}
			</main>
			<MobileNav />
		</div>
	);
};

export default Dashboard;
