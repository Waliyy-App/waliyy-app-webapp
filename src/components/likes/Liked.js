import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import { getLikes } from "../../services";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import CustomTabPanel from "../../common/CustomTabPanel";

const Liked = ({value}) => {
	const [likes, setLikes] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				setLoading(true);
				const res = await getLikes(childId, "given", token);
				setLikes(res?.data);
			} catch (err) {
				throw new Error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchLikes();
	}, [childId, token]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<CustomTabPanel value={value} index={0}>
					<div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
						<p className="text-[#2D133A] font-bold text-4xl">Liked</p>
						<p className="text-[#667085] text-xl">
							These are the people you liked.
						</p>
					</div>
					{likes.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{likes.map((item) => (
								<ProfileCard
									key={item.id}
									id={item.receiver._id}
									firstName={item.receiver.firstName}
									lga={item.receiver.lga}
									age={item.receiver.age}
									residence={item.receiver.countryofResidence}
									about={item.receiver.about}
									profession={item.receiver.profession}
									gender={item.receiver.gender}
								/>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-[50vh]">
							<p className="text-white rounded bg-[#2D133A] p-10 text-xl">
								No liked profiles found.
							</p>
						</div>
					)}
				</CustomTabPanel>
			)}
		</div>
	);
};

export default Liked;
