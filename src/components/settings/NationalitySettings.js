import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput } from '../../common/form';

const NationalitySettings = ({ value, handleComplete }) => {
  const initialValues = {
    citizenship: 'Nigerian',
    stateOfOrigin: 'Oyo',
    lga: 'Ibadan North East',
    residence: 'nig',
    mixedEthnicity: 'no',
    mixedEthnicityType: '',
  };
  return (
    <CustomTabPanel value={value} index={1}>
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
              <option value="nig">Nigeria</option>
            </SelectInput>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-12">
            <SelectInput label="Are you mixed ethnicity" name="mixedEthnicity">
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

export default NationalitySettings;
