import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import { TextInput, CheckboxInputTwo } from '../common/form';
import {
  countryOptions,
  citizenshipOptions,
  genotypeOption,
  maritalStatusOption,
  educationOptions,
  employmentStatusOptions,
  salatOptions,
} from '../data/formValues';
import { MultiSelect } from 'react-multi-select-component';

export const Filters = () => {
  const [selectedGenotype, setSelectedGenotype] = useState([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [selectedLevelOfEdu, setSelectedLevelOfEdu] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState([]);
  const [selectedSalat, setSelectedSalat] = useState([]);

  const initialValues = {
    minAge: '',
    maxAge: '',
    genotype: '',
    minHeight: '',
    maxHeight: '',
    minWweight: '',
    maxWweight: '',
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

  const childrenOption = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box
        spacing={4}
        className="mx-auto px-8 py-12 box-shadow-style rounded-lg w-full"
      >
        <div className="flex flex-col px-8 mb-8">
          <p className="font-semibold text-2xl text-[#2D133A]">
            Set your preference
          </p>
          <p className="text-[#665e6b] text-lg">Choose what you want</p>
        </div>

        <div className="py-8 px-0 sm:px-8 w-full md:w-10/12 mx-auto flex flex-col items-center justify-center gap-10">
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
              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
                <div className="flex items-center gap-5 w-full">
                  <TextInput label="Minimum Age" name="minAge" type="text" />
                  <TextInput label="Maximum Age" name="maxAge" type="text" />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="genotype"
                  >
                    Genotype
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={genotypeOption}
                    value={selectedGenotype}
                    onChange={setSelectedGenotype}
                    labelledBy="Genotype"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
                <div className="flex items-center gap-5 w-full">
                  <TextInput
                    label="Minimum Height (m)"
                    name="minHeight"
                    type="number"
                  />
                  <TextInput
                    label="Maximum Height (m)"
                    name="maxHeight"
                    type="number"
                  />
                  <TextInput
                    label="Minimum Weight (kg)"
                    name="minWeight"
                    type="number"
                  />
                  <TextInput
                    label="Maximum Weight (kg)"
                    name="maxWeight"
                    type="number"
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="maritalStatus"
                  >
                    Marital Status
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={maritalStatusOption}
                    value={selectedMaritalStatus}
                    onChange={setSelectedMaritalStatus}
                    labelledBy="MaritalStatus"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="children"
                  >
                    Children
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={childrenOption}
                    value={selectedChildren}
                    onChange={setSelectedChildren}
                    labelledBy="Children"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="levelOfEducation"
                  >
                    Level of Education
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={educationOptions}
                    value={selectedLevelOfEdu}
                    onChange={setSelectedLevelOfEdu}
                    labelledBy="LevelOfEdu"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="employmentStatus"
                  >
                    Employment Status
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={employmentStatusOptions}
                    value={selectedEmployment}
                    onChange={setSelectedEmployment}
                    labelledBy="Employment"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="residence"
                  >
                    Country of Residence
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={countryOptions}
                    value={selectedCountries}
                    onChange={setSelectedCountries}
                    labelledBy="Residence"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="citizenship"
                  >
                    Nationality
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={citizenshipOptions}
                    value={selectedNationality}
                    onChange={setSelectedNationality}
                    labelledBy="citizenship"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="salat"
                  >
                    Pattern of Salat
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={salatOptions}
                    value={selectedSalat}
                    onChange={setSelectedSalat}
                    labelledBy="Salat"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-8">
                <CheckboxInputTwo name="revert">
                  Willing to relocate
                </CheckboxInputTwo>
                <CheckboxInputTwo name="revert">
                  Unwilling to relocate
                </CheckboxInputTwo>
                <CheckboxInputTwo name="revert">Revert</CheckboxInputTwo>
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
