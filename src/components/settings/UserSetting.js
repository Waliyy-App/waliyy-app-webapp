import React from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import CustomTabPanel from '../../common/CustomTabPanel';
import { TextInput, SelectInput, TextArea } from '../../common/form';
import {
  genotypeOption,
  countryOptions,
  educationOptions,
  employmentStatusOptions,
  maritalStatusOption,
  salatOptions,
  citizenshipOptions,
} from '../../data/formValues';
import { updateUserProfile } from '../../services';
import { useAuthContext } from '../../context/AuthContext';
import { capitalize } from '../../utils.js';

const UserSetting = ({ value, child }) => {
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  const initialValues = {
    weight: child?.weight,
    height: child?.height,
    maritalStatus: child?.maritalStatus,
    citizenship: child?.citizenship,
    countryofResidence: child?.countryofResidence,
    educationLevel: child?.educationLevel,
    hasChildren: child?.hasChildren,
    isSmoker: child?.isSmoker,
    isDrinker: child?.isDrinker,
    hasAddictions: child?.hasAddictions,

    lga: child?.lga,
    descriptionOfIslamicPractice: child?.descriptionOfIslamicPractice,
    salatPattern: child?.salatPattern,

    profession: child?.profession,
    employmentStatus: child?.employmentStatus,
    professionalPlans: child?.professionalPlans,
    isWillingToRelocate: child?.isWillingToRelocate,
    relocationPlans: child?.relocationPlans,
    isARevert: child?.isARevert,
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
          const updatedValues = {
            ...values,
            speakersListenedTo: Array.isArray(values.speakersListenedTo)
              ? values.speakersListenedTo
              : values.speakersListenedTo
                  ?.split(',')
                  .map((speaker) => speaker.trim())
                  .filter((speaker) => speaker),
          };

          try {
            const res = await updateUserProfile(updatedValues, childId, token);
            toast.success(res?.message);
            window.location.reload();
          } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
          }
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
              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  First Name
                </p>
                <p className="text-input w-full border-b h-9 border-b-[#CDD1D0]">
                  {child.firstName}
                </p>
              </div>

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">Last Name</p>
                <p className="text-input w-full border-b h-9 border-b-[#CDD1D0]">
                  {child.lastName}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  Date of Birth
                </p>
                <p className="text-input w-full border-b h-9 border-b-[#CDD1D0]">
                  {`${child.monthOfBirth}/${child.yearOfBirth}`}
                </p>
              </div>

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">Gender</p>
                <p className="text-input w-full border-b h-9 border-b-[#CDD1D0]">
                  {capitalize(child.gender)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Genotype" name="genotype" readOnly>
                <option value={child.genotype}>{child.genotype}</option>
                {genotypeOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>

              <TextInput label="Height (m)" name="height" type="height" />
              <TextInput label="Weight (kg)" name="weight" type="number" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Marital Status" name="maritalStatus">
                <option value={child.maritalStatus}>
                  {capitalize(child.maritalStatus)}
                </option>
                {maritalStatusOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>

              <SelectInput
                label="Do you have children?"
                name="hasChildren"
                defaultValue={String(child.hasChildren)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </SelectInput>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[#665e6b] text-lg font-semibold">Do you...</p>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput
                  label="Smoke?"
                  name="isSmoker"
                  defaultValue={String(child.isSmoker)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </SelectInput>

                <SelectInput
                  label="Drink?"
                  name="isDrinker"
                  defaultValue={String(child.isDrinker)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </SelectInput>

                <SelectInput
                  label="Have any addiction?"
                  name="hasAddictions"
                  defaultValue={String(child.hasAddictions)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </SelectInput>
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
              <SelectInput label="Citizenship" name="citizenship">
                <option value={child.citizenship}>
                  {capitalize(child.citizenship)}
                </option>
                {citizenshipOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  State of Origin
                </p>
                <p className="text-input w-full h-9 border-b border-b-[#CDD1D0]">
                  {child.state}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextInput
                label="State / County of Residence"
                name="lga"
                type="text"
              />

              <SelectInput
                label="Country of Residence"
                name="countryofResidence"
              >
                <option value={child.countryofResidence}>
                  {child.countryofResidence}
                </option>
                {countryOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  Are you mixed ethnicity?
                </p>
                <p className="text-input w-full h-9 border-b border-b-[#CDD1D0]">
                  {child.isMixedEthnicity === true ? 'Yes' : 'No'}
                </p>
              </div>

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  If yes, specify
                </p>
                <p className="text-input w-full h-9 border-b border-b-[#CDD1D0]">
                  {child.mixedEthnicityDescription}
                </p>
              </div>
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
                <option value={child.educationLevel}>
                  {capitalize(child.educationLevel)}
                </option>
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
                label="What are your short and medium term qualification and professional plans?"
                name="professionalPlans"
                rows="10"
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
                label="Are you a revert?"
                name="isARevert"
                defaultValue={String(child.isARevert)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </SelectInput>

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  Are you Sunni or Shi'a?
                </p>
                <p className="text-input w-full h-9 border-b border-b-[#CDD1D0]">
                  {capitalize(child.sect)}
                </p>
              </div>
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
              <TextInput
                type="text"
                label="Speakers/Scholars you listen to"
                name="speakersListenedTo"
              />

              <div className={`flex flex-col w-full gap-4 relative`}>
                <p className="text-sm font-medium  text-[#2D133A]">
                  When did you start practicing?
                </p>
                <p className="text-input w-full h-9 border-b border-b-[#CDD1D0]">
                  {capitalize(child.startedPracticingIn)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Pattern of salat" name="salatPattern">
                <option value="">Select option</option>
                {salatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>

              <TextInput
                type="text"
                label="If yes, specify"
                name="relocationType"
                classname="hidden sm:flex sm:invisible"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextArea
                classname="w-full sm:w-[640px]"
                rows="10"
                label="Describe your Islamic practice"
                name="descriptionOfIslamicPractice"
                placeholder="Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on..."
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
                classname="w-full sm:w-[640px]"
                rows="10"
                label="Tell us about you"
                name="about"
                placeholder="Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on..."
              />

              <TextArea
                classname="w-full sm:w-[640px]"
                rows="10"
                label="Tell us about your education and job"
                name="aboutEducationAndJob"
              />

              <TextArea
                classname="w-full sm:w-[640px]"
                rows="10"
                label="Tell us how you dress"
                name="aboutDressing"
              />
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

          <div className="w-full flex gap-8 justify-end items-center">
            <button
              type="button"
              className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
            >
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
