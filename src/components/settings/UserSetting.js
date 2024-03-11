import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, TextArea } from '../../common/form';
import {
  genotypeOption,
  countryOptions,
  salatOptions,
} from '../../data/formValues';

const UserSetting = ({ handleComplete, value }) => {
  const initialValues = {
    firstName: 'Oladunni',
    lastName: 'Odetunde',
    dateOfBirth: '15/06/1997',
    gender: 'FEMALE',
    genotype: 'AC',
    height: 1.73,
    weight: 70,
    maritalStatus: 'SINGLE',
    haveChildren: 'No',
    smoke: 'No',
    drink: 'No',
    addiction: 'No',

    citizenship: 'Nigerian',
    stateOfOrigin: 'Oyo',
    lga: 'Ibadan South East',
    residence: 'Nigeria',
    mixedEthnicity: 'No',
    mixedEthnicityType: '',

    levelOfEducation: 'masters',
    profession: 'Web Developer',
    employmentStatus: 'employed',
    shortTermPlans: '',
    willingnessToRelocate: 'yes',
    relocationType: 'United Kingdom',

    revert: 'yes',
    sect: 'sunni',
    islamicOrganization: 'no',
    organizationType: '',
    speakers: 'N/A',
    startPractising: 'recent',
    salat: 'Partial Daily',
    islamicPractice: '',

    aboutYou: '',
    aboutEducationAndJob: '',
    dressing: '',
  };

  return (
    <CustomTabPanel value={value} index={0}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleComplete();
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              <SelectInput label="Genotype" name="genotype">
                <option value="">Select option</option>
                {genotypeOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>

              <TextInput label="Height (m)" name="height" type="number" />

              <TextInput label="Weight (kg)" name="weight" type="number" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Marital Status" name="maritalStatus">
                <option value="">Select option</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </SelectInput>

              <SelectInput label="Do you have children?" name="haveChildren">
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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

              <SelectInput label="Country of Residence" name="residence">
                <option value="">Select option</option>
                {countryOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput
                label="Are you mixed ethnicity"
                name="mixedEthnicity"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </SelectInput>

              <TextInput
                type="text"
                label="If yes, specify"
                name="mixedEthnicityType"
              />
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
              <SelectInput label="Level of Education" name="levelOfEducation">
                <option value="">Select option</option>
                <option value="none">None</option>
                <option value="primary">Primary Education</option>
                <option value="secondary">Secondary Secondary</option>
                <option value="undergraduate">Undergraduate Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
              </SelectInput>

              <TextInput label="Profession" name="profession" type="text" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Employment Status" name="employmentStatus">
                <option value="">Select option</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
                <option value="disabled">
                  Disabled - Unable to work due to disability
                </option>
              </SelectInput>
              <TextInput
                label="something"
                name="something"
                classname="hidden sm:flex sm:invisible"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextArea
                label="What are you short/medium term qualification and professional plans?"
                name="shortTermPlans"
                placeholder="Enter..."
              />
              <TextInput
                label="something"
                name="something"
                classname="hidden sm:flex sm:invisible"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput
                label="Are you willing to relocate?"
                name="willingnessToRelocate"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </SelectInput>

              <TextInput
                type="text"
                label="If yes, specify"
                name="relocationType"
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
              <SelectInput label="Are you a revert?" name="revert">
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </SelectInput>

              <SelectInput label="Are you Sunni or Shi'a" name="sect">
                <option value="">Select option</option>
                <option value="sunni">Sunni</option>
                <option value="Shi'a">Shi'a</option>
              </SelectInput>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput
                label="Do you belong to any Islamic Organization?"
                name="islamicOrganization"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </SelectInput>

              <TextInput
                type="text"
                label="If yes, specify"
                name="organizationType"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextInput
                type="text"
                label="Speakers/Scholars you listen to"
                name="speakers"
              />
              <SelectInput
                label="When did you start practicing?"
                name="startPractising"
              >
                <option value="">Select option</option>
                <option value="childhood">Childhood</option>
                <option value="adolescence">Adolescence</option>
                <option value="adulthood">Adulthood</option>
                <option value="recent">Recently</option>
                <option value="none">Not Practicing</option>
                <option value="notSaying">Prefer not to say</option>
              </SelectInput>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <SelectInput label="Pattern of salat" name="salat">
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
                label="Describe your Islamic practice"
                name="islamicPractice"
                placeholder="Tell us about your family’s relationship with Islam, upbringing, when you started practising, what are you currently learning about, how much Qur’an memorised..."
              />
              <TextInput
                label="something"
                name="something"
                classname="hidden sm:flex sm:invisible"
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
                name="aboutYou"
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
                name="dressing"
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
