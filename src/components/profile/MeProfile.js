import React from "react";
import CustomTabPanel from "../../common/CustomTabPanel";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { GiBigDiamondRing } from "react-icons/gi";
import FlagIcon from "@mui/icons-material/Flag";
import NoStrollerIcon from "@mui/icons-material/NoStroller";
// import StrollerIcon from '@mui/icons-material/Stroller'; for if hasChildren is true
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
// import SmokeRoomsIcon from '@mui/icons-material/SmokeRooms'; for if isSmoker is true
import NoDrinksIcon from "@mui/icons-material/NoDrinks";
// import LocalBarIcon from '@mui/icons-material/LocalBar'; for if isDrinker is true
import VaccinesIcon from "@mui/icons-material/Vaccines";

const MeProfile = ({
	value,
	about,
	dressing,
	genotype,
	height,
	weight,
	hasChildren,
	smoke,
	drink,
	addictions,
	maritalStatus,
	nationality,
}) => {
	return (
		<CustomTabPanel value={value} index={0}>
			<div className="flex flex-col items-start gap-10 py-8">
				<div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
					<div>
						<p className="mb-[10px] text-lg font-semibold">About Me!</p>
						<p>
							{about ||
								`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.`}
						</p>
					</div>
					<div>
						<p className="mb-[10px] text-lg font-semibold">How do I dress?</p>
						<p>
							{dressing ||
								`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.`}
						</p>
					</div>
				</div>

				<div className="w-full sm:w-2/5">
					<p className="text-lg font-semibold mb-4">My Details</p>
					<div className="flex flex-wrap gap-4">
						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<BloodtypeIcon /> {genotype || "AC"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<StraightenIcon /> {`${height}m` || "1.69m"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<FitnessCenterIcon /> {`${weight}kg` || "70kg"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<GiBigDiamondRing className="w-6 h-6" />{" "}
							{maritalStatus || "Single"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<FlagIcon /> {nationality || "Nigerian"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<FlagIcon /> Canadian
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<NoStrollerIcon /> {hasChildren ? "" : "No Children"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<SmokeFreeIcon />
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<NoDrinksIcon />
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<VaccinesIcon />
							{addictions ? "" : "No Addictions"}
						</div>
					</div>
				</div>
			</div>
		</CustomTabPanel>
	);
};

export default MeProfile;
