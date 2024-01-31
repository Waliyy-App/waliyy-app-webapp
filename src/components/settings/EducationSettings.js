import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, TextArea } from '../../common/form';

const EducationSettings = ({ value, handleComplete }) => {
  const initialValues = {
    levelOfEducation: 'masters',
    profession: 'Web Developer',
    employmentStatus: 'employed',
    shortTermPlans: '',
    willingnessToRelocate: 'yes',
    relocationType: 'United Kingdom',
  };
  return (
    <CustomTabPanel value={value} index={2}>
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
        <Form className="flex flex-col gap-10 px-0 sm:px-8">
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

export default EducationSettings;
