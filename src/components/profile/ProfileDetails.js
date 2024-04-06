import React, { useState, useEffect } from "react";
import SidebarComponent from "../sidebar/Sidebar";
import ProfileHeader from "./ProfileHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MeProfile from "./MeProfile";
import EduProfile from "./EduProfile";
import DeenProfile from "./DeenProfile";
import { usePersistedState, a11yProps } from "../../utils.js";
import MobileNav from "../sidebar/MobileBottomNav.js";
import MobileTopNav from "../sidebar/MobileTopNav.js";
import { getChild } from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const ProfileDetails = () => {
	const [value, setValue] = useState(0);
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [child, setChild] = useState({});

	const { childId, token } = useAuthContext();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		async function getChildDetails() {
			try {
				const res = await getChild(childId, token);
				setChild(res?.data);
			} catch (err) {
				throw err;
			}
		}

		getChildDetails();
	}, [childId, token]);

	return (
		<div className="flex flex-col sm:flex-row">
			<SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
			<MobileTopNav />
			<main
				className={`${
					isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
				} py-[64px] px-8 w-full transition-all duration-300`}
			>
				<React.Fragment>
					<ProfileHeader
						firstName={child?.firstName}
						age={child?.age}
						profession={child?.profession}
						residence={child?.countryofResidence}
						gender={child?.gender}
					/>
					<div>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
								textColor="inherit"
								indicatorColor="secondary"
							>
								<Tab label="Me" {...a11yProps(0)} />
								<Tab label="My Education and Profession" {...a11yProps(1)} />
								<Tab label="My Deen" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<MeProfile
							about={child?.about}
							dressing={child?.aboutDressing}
							genotype={child?.genotype}
							height={child?.height}
							weight={child?.weight}
							hasChildren={child?.hasChildren}
							smoke={child?.isSmoker}
							drink={child?.isDrinker}
							maritalStatus={child?.maritalStatus}
							nationality={child?.citizenship}
							addictions={child?.hasAddictions}
							value={value}
						/>
						<EduProfile
							eduProf={child?.aboutEducationAndJob}
							plans={child?.professionalPlans}
							value={value}
							educationLevel={child?.educationLevel}
							employmentStatus={child?.employmentStatus}
							profession={child?.profession}
							isWillingToRelocate={child?.isWillingToRelocate}
							relocationPlans={child?.relocationPlans}
						/>
						<DeenProfile
							practiceDesc={child?.descriptionOfIslamicPractice}
							speakers={child?.speakersListenedTo}
							revert={child?.isARevert}
							salatPattern={child?.salatPattern}
							sect={child?.sect}
							startedPracticingIn={child?.startedPracticingIn}
							value={value}
						/>
					</div>
				</React.Fragment>
			</main>
			<MobileNav />
		</div>
	);
};

export default ProfileDetails;
