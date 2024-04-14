import React, { useState, useEffect } from "react";
import MaleIcon from "../assets/illustrations/muslim.svg";
import FemaleIcon from "../assets/illustrations/female-illus.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BsFillDiamondFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { capitalize } from "../utils.js";

const truncateText = (text, maxWords) => {
	const words = text?.split(/\s+/);
	const truncated = words?.slice(0, maxWords).join(" ");
	return truncated + "...";
};

const ProfileCard = ({
	id,
	about,
	residence,
	age,
	firstName,
	state,
	height,
	maritalStatus,
	profession,
	gender,
}) => {
	const [truncatedLoremIpsum, setTruncatedLoremIpsum] = useState("");

	useEffect(() => {
		setTruncatedLoremIpsum(truncateText(about, 20));
	}, [about]);

	const heightInFoot = (height * 3.281).toFixed(1);
	function decimalToFeet() {
		const feet = Math.floor(heightInFoot);
		const inches = Math.round((heightInFoot - feet) * 10);

		return `${feet} ft ${inches}`;
	}

	return (
		<Link
			to={`/recommended/${id}`}
			className="profile-card bg-[#FFF4F6] rounded-2xl px-6 pt-6 pb-8 flex flex-col gap-8 w-full sm:w-[335px] cursor-pointer"
		>
			<div className="mb-auto flex flex-col gap-y-8">
				<div className="w-[128px] h-[128px] rounded-full border-4 border-[#FE8D9F] flex items-center justify-center z-30 relative overflow-hidden mx-auto">
					<img
						src={gender === "MALE" ? MaleIcon : FemaleIcon}
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="text-[#2D133A]">
					<div className="flex items-center gap-2  text-2xl font-bold">
						<p>{firstName}</p>
						<BsFillDiamondFill className="h-2 w-2" />
						<p>{age}</p>
					</div>

					<div className="flex items-end gap-1 ">
						<LocationOnIcon />
						<p className="text-sm font-light">
							{state}, {residence}
						</p>
					</div>
				</div>

				<div>
					<p>{truncatedLoremIpsum}</p>
				</div>
			</div>
			<div className="flex items-center justify-between text-[#FF4164] text-sm font-semibold">
				<p>{capitalize(maritalStatus)}</p>
				<BsFillDiamondFill className="h-1 w-1" />
				<p>{profession}</p>
				<BsFillDiamondFill className="h-1 w-1" />
				<p>Hausa</p>
				<BsFillDiamondFill className="h-1 w-1" />
				<p>{decimalToFeet()}</p>
			</div>
		</Link>
	);
};

export default ProfileCard;
