import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import MoodIcon from "@mui/icons-material/EmojiEmotions";
import SidebarComponent from "../components/sidebar/Sidebar";
import Liked from "../components/likes/Liked";
import LikedYou from "../components/likes/LikedYou";
import { usePersistedState, a11yProps } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";

const LikePage = () => {
	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
	const [value, setValue] = useState("");

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
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
				<Tabs
					value={value}
					onChange={handleChange}
					textColor="inherit"
					className="overflow-scroll"
					indicatorColor="secondary"
					aria-label="icon position tabs example"
					centered
				>
					<Tab
						icon={<ThumbUpIcon />}
						iconPosition="start"
						label="Liked"
						{...a11yProps(0)}
					/>
					<Tab
						icon={<MoodIcon />}
						iconPosition="start"
						label="Liked You"
						{...a11yProps(1)}
					/>
				</Tabs>
				<Liked value={value} />
				<LikedYou value={value} />
			</main>
			<MobileNav />
		</div>
	);
};

export default LikePage;
