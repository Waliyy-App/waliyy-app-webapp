import React from "react";
import SidebarComponent from "../components/sidebar/Sidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import MoodIcon from "@mui/icons-material/EmojiEmotions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Liked from "../components/likes/Liked";
import LikedYou from "../components/likes/LikedYou";
import { usePersistedState, a11yProps } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import MobileTopNav from "../components/sidebar/MobileTopNav.js";
import Viewed from "../components/likes/Viewed.js";

const LikePage = () => {
	const [value, setValue] = React.useState(0);

	const [isOpen, setIsOpen] = usePersistedState("isOpen", false);

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
					<Tab
						icon={<RemoveRedEyeIcon />}
						iconPosition="start"
						label="Viewed You"
						{...a11yProps(2)}
					/>
				</Tabs>

				<Liked value={value} />
				<LikedYou value={value} />
				<Viewed value={value} />
			</main>
			<MobileNav />
		</div>
	);
};

export default LikePage;

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}
