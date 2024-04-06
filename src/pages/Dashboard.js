import React from "react";
import SidebarComponent from "../components/sidebar/Sidebar";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";
import ProfileCard from "../components/ProfileCard.js";

const Dashboard = () => {
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);

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
				<div className="flex justify-end py-8">
					<Link to="/filter">
						<HiOutlineAdjustmentsHorizontal className="h-8 w-8" />
					</Link>
				</div>

				<div className="flex flex-wrap gap-6">
					<ProfileCard id={1} />
				</div>
			</main>
			<MobileNav />
		</div>
	);
};

export default Dashboard;
