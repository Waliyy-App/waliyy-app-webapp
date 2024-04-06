import React from "react";
import { useParams } from "react-router-dom";
import { BsFillDiamondFill } from "react-icons/bs";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import MaleIcon from "../../assets/illustrations/male-illus.svg";
import FemaleIcon from "../../assets/illustrations/female-illus.svg";
// import { likeProfile, unlikeProfile } from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const ProfileHeader = ({ firstName, age, profession, residence, gender }) => {
	const { childId } = useAuthContext();
	// no id in the url yet
	const { id } = useParams();
	const isCurrentUser = childId === id;

	return (
		<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between py-8 gap-10">
			<div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
				<div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
					<img
						src={gender?.toLowerCase() === "male" ? MaleIcon : FemaleIcon}
						alt=""
						className="w-24 h-24 z-40"
					/>
				</div>

				<div className="text-[#2D133A] text-center sm:text-left">
					<div className="flex items-center gap-2 text-2xl font-bold">
						<p>{firstName || "Raufah"}</p>
						<BsFillDiamondFill className="h-2 w-2" />
						<p>{age || 27}</p>
					</div>
					<p className="text-lg font-bold">{profession || "Web Developer"}</p>

					<div className="flex items-center sm:justify-start justify-center gap-1 ">
						<LocationOnIcon />
						<p className="text-sm font-light">{residence || "Nigeria"}</p>
					</div>
				</div>
			</div>

			{!isCurrentUser && (
				<div className="flex items-center gap-3 self-center sm:self-end">
					<button className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300">
						<ThumbUpIcon /> Interested
					</button>
					<button className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300">
						<ThumbDownIcon /> Uninterested
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileHeader;
