import React from "react";
import CustomTabPanel from "../../common/CustomTabPanel";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
// import WorkOffIcon from '@mui/icons-material/WorkOff'; for if employmentStatus is unemployed
import BadgeIcon from "@mui/icons-material/Badge";
import {
	employmentStatusOptions,
	educationOptions,
} from "../../data/formValues";

const EduProfile = ({
	value,
	eduProf,
	plans,
	educationLevel,
	employmentStatus,
	profession,
	relocationPlans,
	isWillingToRelocate,
}) => {
	const getEmploymentStatus = (value) => {
		const employment = employmentStatusOptions?.filter(
			(options) => options?.value === value
		);
		return employment?.[0]?.label;
	};
	const getEducationStatus = (value) => {
		const education = educationOptions?.filter(
			(options) => options?.value === value
		);
		return education?.[0]?.label;
	};
	return (
		<CustomTabPanel value={value} index={1}>
			<div className="flex flex-col items-start gap-10 py-8">
				<div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
					<div>
						<p className="mb-[10px] text-lg font-semibold">
							About my education and profession!
						</p>
						<p>
							{eduProf ||
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
						<p className="mb-[10px] text-lg font-semibold">
							My short/medium term qualification and professional plans
						</p>
						<p>
							{plans ||
								`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.`}
						</p>
					</div>

					{isWillingToRelocate && (
						<div>
							<p className="mb-[10px] text-lg font-semibold">
								Willing to relocate to...
							</p>
							<p>{relocationPlans || "Europe"}</p>
						</div>
					)}
				</div>

				<div className="w-full sm:w-2/5">
					<p className="text-lg font-semibold mb-4">My Details</p>
					<div className="flex flex-wrap gap-4">
						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
							<SchoolIcon />{" "}
							{getEmploymentStatus(employmentStatus) || "Masters"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold  flex items-center gap-1">
							<WorkIcon /> {getEducationStatus(educationLevel) || "Employed"}
						</div>

						<div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold  flex items-center gap-1">
							<BadgeIcon /> {profession || "Web developer"}
						</div>
					</div>
				</div>
			</div>
		</CustomTabPanel>
	);
};

export default EduProfile;
