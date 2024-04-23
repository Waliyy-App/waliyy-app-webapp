import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sidebar/Sidebar";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { getMatch } from "../services";
import { useAuthContext } from "../context/AuthContext.js";
import Loader from "../components/Loader.js";

const MatchPage = () => {
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [isLoading, setIsLoading] = useState(false);
	const [matches, setMatches] = useState([]);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	console.log(matches);
	useEffect(() => {
		const getMatches = async () => {
			try {
				setIsLoading(true);
				const res = await getMatch(childId, token);
				console.log(res);
				setMatches(res?.data);
			} catch (err) {
				console.log(err);
				throw err;
			} finally {
				setIsLoading(false);
			}
		};

		getMatches();

		return () => getMatches();
	}, [token, childId]);

	return (
		<div className="flex flex-col sm:flex-row">
			<SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
			<MobileTopNav />
			<main
				className={`${
					isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
				} py-[64px] px-8 w-full transition-all duration-300`}
			>
				{isLoading ? (
					<Loader />
				) : (
					<div>
						<div className="flex flex-col matches?.match?-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
							<p className="text-[#BA9FFE]">Match</p>
							<p className="text-[#2D133A] font-bold text-4xl">
								This is who you have matched with.
							</p>
						</div>
						{matches?.match ? (
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<ProfileCard
									state="match"
									key={matches?.match?.id}
									id={matches?.match?.id}
									age={matches?.match?.age}
									lga={matches?.match?.lga}
									firstName={matches?.match?.firstName}
									residence={matches?.match?.countryofResidence}
									about={matches?.match?.about}
									profession={matches?.match?.profession}
									gender={matches?.match?.gender}
								/>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center h-[50vh]">
								<p className="text-white rounded bg-[#2D133A] p-10 text-xl">
									No matched profile found.
								</p>
							</div>
						)}
					</div>
				)}
			</main>

			<MobileNav />
		</div>
	);
};

export default MatchPage;
