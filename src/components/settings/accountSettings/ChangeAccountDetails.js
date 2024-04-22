import React, { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { TextInput } from "../../../common/form";
import { addAlternateEmail } from "../../../services";
import { useAuthContext } from "../../../context/AuthContext";

const ChangeAccountDetails = () => {
	const [disabled, setIsDisabled] = useState(false);
	const user = localStorage.getItem("user");
	const userObject = JSON.parse(user);
	const { token } = useAuthContext();

	const initialValues = {
		email: "",
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values) => {
				try {
					setIsDisabled(true);
					const res = await addAlternateEmail(
						{
							email: values.email,
						},
						token
					);
					toast.success(res?.message);
				} catch (error) {
					toast.error(error.response.data.message);
				} finally {
					setIsDisabled(false);
				}
			}}
		>
			<Form className="flex flex-col gap-10 px-0 sm:px-8 pt-6">
				<div className="flex flex-col gap-1">
					<p className="font-medium text-lg text-[#2D133A]">Account</p>
					<p className="text-[#667085] text-sm">Update your account here</p>
					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
				</div>

				<div className="flex flex-col sm:flex-row justify-between gap-12">
					<div className="flex flex-col gap-y-2 w-full">
						<p className="text-sm font-medium mb-2 text-[#2D133A]">Full Name</p>
						<p className="border-b pb-3">{userObject.fullName}</p>
					</div>
					<div className="flex flex-col gap-y-2 w-full">
						<p className="text-sm font-medium mb-2 text-[#2D133A]">
							Email Address
						</p>
						<p className="border-b pb-3">{userObject.email}</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between gap-12">
					<TextInput
						label="Alternative Email Address"
						name="email"
						type="email"
					/>
					<div className="flex flex-col gap-y-2 w-full">
						<p className="text-sm font-medium mb-2 text-[#2D133A]">
							Phone Number
						</p>
						<p className="border-b pb-3">{userObject.phone}</p>
					</div>
				</div>

				<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

				<div className="w-full flex gap-8 justify-end items-center">
					<button className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
						Cancel
					</button>
					<button
						className="bg-[#BA9FFE] disabled:bg-[#9A8AAC] hover:bg-[#a37eff] text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
						type="submit"
						disabled={disabled}
					>
						Save Changes
					</button>
				</div>
			</Form>
		</Formik>
	);
};

export default ChangeAccountDetails;
