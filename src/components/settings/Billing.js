import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CustomTabPanel from "../../common/CustomTabPanel";
import BillingHistory from "./billings/BillingHistory";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import { getPaymentHistory } from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const Billing = ({ value }) => {
	const [hasSubscription, setHasSubscription] = useState(false);
	const { token } = useAuthContext();

	useEffect(() => {
		const getHistory = async () => {
			try {
				const res = await getPaymentHistory(token);
				setHasSubscription(res?.data);
			} catch (error) {
				toast.error(error.response.data.message);
			}
		};

		getHistory();
	}, [token]);
	return (
		<CustomTabPanel value={value} index={1} className="w-full">
			<div className="mb-16 px-0 sm:px-8 pt-6 w-100">
				<p className="font-medium text-lg text-[#2D133A]">Account Plan</p>

				<div className="flex p-6 text-[#2D133A] justify-between w-full sm:w-3/5 shadow rounded-xl my-4 mb-10">
					<div className="flex flex-col gap-2 ">
						<p className="font-semibold">Free Plan</p>
						<p className="text-sm">Our most popular plan.</p>
						<Link to="/pricing" className="mt-8 font-semibold text-[#BA9FFE]">
							Upgrade Plan <ArrowOutwardIcon />
						</Link>
					</div>

					<div className="font-semibold text-4xl">
						₦0 <span className="text-sm">per annum</span>
					</div>
				</div>

				<p className="font-medium text-lg text-[#2D133A]">Billing History</p>

				<div className="my-8 w-full">
					{hasSubscription?.length ? (
						<BillingHistory />
					) : (
						<div className="flex items-center justify-center shadow rounded-xl p-6 w-full">
							<p>You have no payment history</p>
						</div>
					)}
				</div>
			</div>
		</CustomTabPanel>
	);
};

export default Billing;
