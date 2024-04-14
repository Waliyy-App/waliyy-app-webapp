import React, { useEffect, useState } from "react";
import CustomTabPanel from "../../common/CustomTabPanel";
import ProfileCard from "../ProfileCard";
import { getLikes } from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const Liked = () => {
	const [likes, setlikes] = useState([]);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");

	useEffect(() => {
		const allLikes = async () => {
			try {
				const res = await getLikes(childId, token);
				setlikes(res?.data);
			} catch (err) {
				throw err;
			}
		};

		allLikes();
	}, [childId, token]);
	return (
		<div>
			<CustomTabPanel>
				<div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
					<p className="text-[#2D133A] font-bold text-4xl">Liked</p>
					<p className="text-[#667085] text-xl">
						These are the people you liked.
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{likes?.map((items) => (
						<ProfileCard
							key={items.id}
							id={items.receiver._id}
							firstName={items.receiver.firstName}
							state={items.receiver.state}
							residence={items.receiver.countryofResidence}
							about={items.receiver.about}
							height={items.receiver.height}
							maritalStatus={items.receiver.maritalStatus}
							profession={items.receiver.profession}
							gender={items.receiver.gender}
						/>
					))}
				</div>
			</CustomTabPanel>
		</div>
	);
};

export default Liked;
