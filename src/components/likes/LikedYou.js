import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import { getLikes } from "../../services";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader";

const Liked = () => {
	const [likes, setLikes] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useAuthContext();
	const childId = localStorage.getItem("childId");

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				setLoading(true);
				const res = await getLikes(childId, "received", token);
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
				<React.Fragment>
					<div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
						<p className="text-[#2D133A] font-bold text-4xl">Liked You</p>
						<p className="text-[#667085] text-xl">
							These are the people that liked your profile.
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
				</React.Fragment>
			)}
		</div>
	);
};

export default Liked;
