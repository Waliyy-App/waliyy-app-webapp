import React, { useState } from "react";
import { Formik, Form } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import CustomTabPanel from "../../common/CustomTabPanel";
import { TextInput, SelectInput, TextArea } from "../../common/form";
import {
	genotypeOption,
	countryOptions,
	educationOptions,
	employmentStatusOptions,
	maritalStatusOption,
} from "../../data/formValues";
import { updateUserProfile } from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const UserSetting = ({ value, child }) => {
	const [speakers, setSpeakers] = useState([]);
	const { childId, token } = useAuthContext();
	const initialValues = {
		weight: child?.weight,
		maritalStatus: child?.maritalStatus,
		educationLevel: child?.educationLevel,
		profession: child?.profession,
		employmentStatus: child?.employmentStatus,
		professionalPlans: child?.professionalPlans,
		isWillingToRelocate: child?.isWillingToRelocate,
		relocationPlans: child?.relocationPlans,
		belongsToIslamicOrganization: child?.belongsToIslamicOrganization,
		islamicOrganizationName: child?.islamicOrganizationName,
		speakersListenedTo: child?.speakersListenedTo,
		about: child?.about,
		aboutEducationAndJob: child?.aboutEducationAndJob,
		aboutDressing: child?.aboutDressing,
	};

	return (
		<CustomTabPanel value={value} index={0}>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					const newValues = {
						...values,
						speakersListenedTo: speakers,
					};

					try {
						const res = await updateUserProfile(newValues, childId, token);
						toast.success(res?.message);
					} catch (error) {
						toast.error(error.response.data.message);
					}
					console.log(newValues);
				}}
			>
				<Form className="flex flex-col gap-10 px-0 sm:px-8 pt-6">
					<React.Fragment>
						<div className="flex flex-col gap-1">
							<p className="font-medium text-lg text-[#2D133A]">
								Personal Details
							</p>
							<p className="text-[#667085] text-sm">
								Update your personal information here
							</p>
							<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
						</div>
						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextInput
								label="First Name"
								name="firstName"
								type="text"
								readOnly
							/>
							<TextInput
								label="Last Name"
								name="lastName"
								type="text"
								readOnly
							/>
						</div>
						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextInput
								label="Date of Birth"
								name="dateOfBirth"
								type="text"
								readOnly
							/>
							<TextInput label="Gender" name="gender" type="text" readOnly />
						</div>
						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput label="Genotype" name="genotype" readOnly>
								<option value="">Select option</option>
								{genotypeOption.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</SelectInput>

							<TextInput
								label="Height (m)"
								name="height"
								type="number"
								readOnly
							/>

							<TextInput label="Weight (kg)" name="weight" type="number" />
						</div>
						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput label="Marital Status" name="maritalStatus">
								{maritalStatusOption.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</SelectInput>
						</div>
						<div className="flex flex-col gap-4">
							<p className="text-[#665e6b] text-lg font-semibold">Do you...</p>
							<div className="flex flex-col sm:flex-row justify-between gap-12">
								<TextInput label="Smoke?" name="smoke" type="text" readOnly />
								<TextInput label="Drink?" name="drink" type="text" readOnly />
								<TextInput
									label="Have any addiction?"
									name="addiction"
									type="text"
									readOnly
								/>
							</div>
						</div>
					</React.Fragment>

					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-lg text-[#2D133A]">
								Heritage and Nationality
							</p>
							<p className="text-[#667085] text-sm">
								Update your heritage and nationality information here
							</p>
							<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextInput
								label="Citizenship"
								name="citizenship"
								type="text"
								readOnly
							/>
							<TextInput
								label="State of Origin"
								name="stateOfOrigin"
								type="text"
								readOnly
							/>
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextInput label="LGA/County" name="lga" type="text" readOnly />

							<SelectInput
								label="Country of Residence"
								name="countryofResidence"
							>
								<option value="">Select option</option>
								{countryOptions.map((option) => (
									<option key={option.id} value={option.value}>
										{option.label}
									</option>
								))}
							</SelectInput>
						</div>
					</div>

					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-lg text-[#2D133A]">
								Education and Profession
							</p>
							<p className="text-[#667085] text-sm">
								Update your educational and professional information here
							</p>
							<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput label="Level of Education" name="educationLevel">
								<option value="">Select option</option>
								{educationOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</SelectInput>

							<TextInput label="Profession" name="profession" type="text" />
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput label="Employment Status" name="employmentStatus">
								<option value="">Select option</option>
								{employmentStatusOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</SelectInput>
							<TextInput
								label="something"
								name="something"
								classname="hidden sm:flex sm:invisible"
								readOnly
							/>
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextArea
								label="What are you short/medium term qualification and professional plans?"
								name="professionalPlans"
								placeholder="Enter..."
							/>
							<TextInput
								label="something"
								name="something"
								classname="hidden sm:flex sm:invisible"
								readOnly
							/>
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput
								label="Are you willing to relocate?"
								name="isWillingToRelocate"
							>
								<option value="">Select option</option>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</SelectInput>

							<TextInput
								type="text"
								label="If yes, specify"
								name="relocationPlans"
							/>
						</div>
					</div>

					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-lg text-[#2D133A]">About Deen</p>
							<p className="text-[#667085] text-sm">
								Update your deen information here
							</p>
							<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<SelectInput
								label="Do you belong to any Islamic Organization?"
								name="belongsToIslamicOrganization"
							>
								<option value="">Select option</option>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</SelectInput>

							<TextInput
								type="text"
								label="If yes, specify"
								name="islamicOrganizationName"
							/>
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<div className="flex flex-col w-full">
								<p className="ext-sm font-medium mb-2 text-[#2D133A]">
									Speakers/Scholars you listen to
								</p>
								<Autocomplete
									freeSolo
									fullWidth
									multiple
									onChange={(e, value) => setSpeakers(value)}
									value={speakers}
									options={["Mufti Menk"]}
									renderInput={(params) => (
										<TextField {...params} variant="standard" />
									)}
									name="speakersListenedTo"
								/>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row justify-between gap-12">
							<TextInput
								type="text"
								label="If yes, specify"
								name="relocationType"
								classname="hidden sm:flex sm:invisible"
								readOnly
							/>
						</div>
					</div>

					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-lg text-[#2D133A]">Self Summary</p>
							<p className="text-[#667085] text-sm">
								Update your self summary here
							</p>
							<div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
						</div>

						<div className="flex flex-col gap-10">
							<TextArea
								classname="w-full sm:w-[469px] "
								label="Tell us about you"
								name="about"
								placeholder="Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on..."
							/>

							<TextArea
								classname="w-full sm:w-[469px] "
								label="Tell us about your education and job"
								name="aboutEducationAndJob"
							/>

							<TextArea
								classname="w-full sm:w-[469px] "
								label="Tell us how you dress"
								name="aboutDressing"
							/>
						</div>
					</div>

					<div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

					<div className="w-full flex gap-8 justify-end items-center">
						<button className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
							Cancel
						</button>
						<button
							className="bg-[#BA9FFE] hover:bg-[#a37eff] text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
							type="submit"
						>
							Save Changes
						</button>
					</div>
				</Form>
			</Formik>
		</CustomTabPanel>
	);
};

export default UserSetting;
