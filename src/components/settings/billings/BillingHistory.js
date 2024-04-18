import React from "react";
import moment from "moment";

import { capitalize, toCurrency } from "../../../utils.js";

const BillingHistory = ({ data }) => {
	return (
		<div className="w-full">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Plan
							</th>
							<th scope="col" className="px-6 py-3">
								Amount
							</th>
							<th scope="col" className="px-6 py-3">
								Date
							</th>
							<th scope="col" className="px-6 py-3">
								Users on plan
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Premium Plan
							</th>
							<td className="px-6 py-4">{toCurrency(data?._doc?.amount)}</td>
							<td className="px-6 py-4">
								{moment(data?._doc?.createdAt).format("MMM DD, YYYY")}
							</td>
							<td className="px-6 py-4">3</td>
							<td className="px-6 py-4">{capitalize(data?._doc?.status)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BillingHistory;
