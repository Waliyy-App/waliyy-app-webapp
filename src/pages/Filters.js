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
import { filterSuitors } from '../services';
import { useAuthContext } from '../context/AuthContext';

export const Filters = () => {
  const [selectedGenotype, setSelectedGenotype] = useState([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [selectedLevelOfEdu, setSelectedLevelOfEdu] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState([]);
  const [selectedSalat, setSelectedSalat] = useState([]);
  const [selectedSect, setSelectedSect] = useState([]);
  const [selectedRelocationOpt, setSelectedRelocationOpt] = useState([]);
  const { token } = useAuthContext();

  const initialValues = {
    minAge: '',
    maxAge: '',
    genotypes: [],
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    maritalStatus: [],
    haveChildren: false,
    levelOfEducation: [],
    employmentStatus: [],
    countryOfResidence: '',
    nationality: [],
    willingnessToRelocate: [],
    patternOfSalat: [],
    sect: [],
    isRevert: false,
    shia: false,
    sunni: false,
    isSmoker: false,
    isDrinker: false,
    hasAddictions: false,
  };

  const childrenOption = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  const relocationOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  const sectOptions = [
    { label: 'Sunni', value: 'SUNNI' },
    { label: "Shi'a", value: 'SHIA' },
  ];

  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      await filterSuitors(values, token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.message);
    }
  }

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
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="flex flex-col gap-10">
              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
                <div className="flex items-center gap-5 w-full">
                  <TextInput label="Min Age" name="minAge" type="text" />
                  <TextInput label="Max Age" name="maxAge" type="text" />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="genotypes"
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
                <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                  <div className="flex items-center gap-5 w-full">
                    <TextInput
                      label="Min Height (m)"
                      name="minHeight"
                      type="number"
                    />
                    <TextInput
                      label="Max Height (m)"
                      name="maxHeight"
                      type="number"
                    />
                  </div>

                  <div className="flex items-center gap-5 w-full">
                    <TextInput
                      label="Min Weight (kg)"
                      name="minWeight"
                      type="number"
                    />
                    <TextInput
                      label="Max Weight (kg)"
                      name="maxWeight"
                      type="number"
                    />
                  </div>
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
                    htmlFor="countryOfResidence"
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
                    htmlFor="nationality"
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
                    htmlFor="willingnessToRelocate"
                  >
                    Willingness to Relocate
                  </label>
                  <MultiSelect
                    className="w-auto text-input mt-3 multi-select"
                    options={relocationOptions}
                    value={selectedRelocationOpt}
                    onChange={setSelectedRelocationOpt}
                    labelledBy="Relocation"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="patternOfSalat"
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

                <div>
                  <label
                    className="text-sm font-medium text-[#2D133A]"
                    htmlFor="sect"
                  >
                    Islamic Sect
                  </label>
                  <MultiSelect
                    hasSelectAll
                    className="w-auto text-input mt-3 multi-select"
                    options={sectOptions}
                    value={selectedSect}
                    onChange={setSelectedSect}
                    labelledBy="sect"
                  />
                </div>

                
              </div>

              <div className="flex flex-wrap gap-8">
                <CheckboxInputTwo name="isRevert">Revert</CheckboxInputTwo>
                <CheckboxInputTwo name="isSmoker">Smokes</CheckboxInputTwo>
                <CheckboxInputTwo name="isDrinker">Drinks</CheckboxInputTwo>
                <CheckboxInputTwo name="hasAddictions">
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
