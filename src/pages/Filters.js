import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, CheckboxInputTwo } from '../common/form';
import { heightRanges, weightRanges } from '../data/formValues';

export const Filters = () => {
  const initialValues = {
    minAge: '',
    maxAge: '',
    genotype: '',
    height: '',
    weight: '',
    maritalStatus: '',
    haveChildren: '',
    levelOfEducation: '',
    employmentStatus: '',
    residence: '',
    stateOfOrigin: '',
    citizenship: '',
    lga: '',
    ethnicity: '',
    willingnessToRelocate: '',
    salat: '',
    revert: false,
    divorcees: false,
    parentsNeverMarried: false,
    single: false,
    widows: false,
    shia: false,
    sunni: false,
    smokes: false,
    drinks: false,
    hasAddiction: false,
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box
        spacing={4}
        className="mx-auto px-8 py-12 box-shadow-style rounded-lg w-full md:w-4/5"
      >
        <div className="flex flex-col px-8 mb-8">
          <p className="font-semibold text-2xl text-[#2D133A]">
            Set your preference
          </p>
          <p className="text-[#665e6b] text-lg">Choose what you want</p>
        </div>

        <div className="py-8 px-0 sm:px-8 w-full md:w-11/12 mx-auto flex flex-col gap-10">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
                navigate('/dashboard');
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Minimum Age" name="minAge">
                  <option value="">Select option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </SelectInput>
                <SelectInput label="Maximum Age" name="maxAge">
                  <option value="">Select option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Genotype" name="genotype">
                  <option value="">Select option</option>
                  <option value="AA">AA</option>
                  <option value="AC">AC</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="CC">CC</option>
                  <option value="SC">SC</option>
                </SelectInput>

                <SelectInput label="Height" name="height">
                  <option value="">Select option</option>
                  {heightRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </SelectInput>

                <SelectInput label="Weight" name="weight">
                  <option value="">Select option</option>
                  {weightRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Marital Status" name="maritalStatus">
                  <option value="">Select option</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </SelectInput>

                <SelectInput label="Children" name="haveChildren">
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Level of Education" name="levelOfEducation">
                  <option value="">Select option</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="British">British</option>
                </SelectInput>

                <SelectInput label="Employment Status" name="employmentStatus">
                  <option value="">Select option</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="British">British</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Country of Residence" name="residence">
                  <option value="">Select option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </SelectInput>

                <SelectInput label="State of Origin" name="stateOfOrigin">
                  <option value="">Select option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Citizenship" name="citizenship">
                  <option value="">Select option</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="British">British</option>
                </SelectInput>

                <SelectInput label="LGA/County" name="lga">
                  <option value="">Select option</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="British">British</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Ethnicity" name="ethnicity">
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </SelectInput>

                <SelectInput
                  label="Wiilingness to relocate"
                  name="willingnessToRelocate"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </SelectInput>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <SelectInput label="Pattern of Salat" name="salat">
                  <option value="">Select option</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="British">British</option>
                </SelectInput>

                <TextInput
                  type="text"
                  label="If yes, specify"
                  name="relocationType"
                  classname="hidden sm:flex sm:invisible"
                />
              </div>

              <div className="flex flex-wrap gap-8">
                <CheckboxInputTwo name="revert">Revert</CheckboxInputTwo>
                <CheckboxInputTwo name="single">Single</CheckboxInputTwo>
                <CheckboxInputTwo name="divorcees">Divorcees</CheckboxInputTwo>
                <CheckboxInputTwo name="parentsNeverMarried">
                  Parents who were never married
                </CheckboxInputTwo>
                <CheckboxInputTwo name="widows">Widows</CheckboxInputTwo>
                <CheckboxInputTwo name="shia">Shi'a</CheckboxInputTwo>
                <CheckboxInputTwo name="sunni">Sunni</CheckboxInputTwo>
                <CheckboxInputTwo name="smokes">Smokes</CheckboxInputTwo>
                <CheckboxInputTwo name="drinks">Drinks</CheckboxInputTwo>
                <CheckboxInputTwo name="hasAddiction">
                  Has an Addiction
                </CheckboxInputTwo>
              </div>

              <div className="flex flex-col sm:flex-row justify-end items-center">
                <button
                  type="submit"
                  className="w-[150px] my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Box>
    </React.Fragment>
  );
};
