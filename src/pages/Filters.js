import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { TextInput, CheckboxInputTwo } from "../common/form";
import {
  countryOptions,
  citizenshipOptions,
  genotypeOption,
  maritalStatusOption,
  educationOptions,
  employmentStatusOptions,
  salatOptions,
} from "../data/formValues";
import { MultiSelect } from "react-multi-select-component";
import { filterSuitors, getChildPreferences, updateFilter } from "../services";
import { useAuthContext } from "../context/AuthContext";

export const Filters = () => {
  const [selectedGenotype, setSelectedGenotype] = useState([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState([]);
  const [childPref, setChildPref] = useState([]);
  const [selectedLevelOfEdu, setSelectedLevelOfEdu] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCitizenship, setSelectedCitizenship] = useState([]);
  const [selectedSalat, setSelectedSalat] = useState([]);
  const [selectedSect, setSelectedSect] = useState([]);
  const { token } = useAuthContext();
  const childId = localStorage.getItem("childId");
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.state?.from === "/dashboard";

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getCurrentChild = async () => {
      try {
        const currentChild = await getChildPreferences(token, childId);
        setChildPref(currentChild?.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getCurrentChild();
  }, [childId, token]);

  const initialValues = {
    minAge: childPref?.minAge ? childPref?.minAge : undefined,
    maxAge: childPref?.maxAge ? childPref?.maxAge : undefined,
    genotypes: childPref?.genotypes ? childPref?.genotypes : [],
    minHeight: childPref?.minHeight ? childPref?.minHeight : undefined,
    maxHeight: childPref?.maxHeight ? childPref?.maxHeight : undefined,
    minWeight: childPref?.minWeight ? childPref?.minWeight : undefined,
    maxWeight: childPref?.maxWeight ? childPref?.maxWeight : undefined,
    maritalStatus: childPref?.maritalStatus ? childPref?.maritalStatus : [],
    levelOfEducation: childPref?.levelOfEducation
      ? childPref?.levelOfEducation
      : [],
    employmentStatus: childPref?.employmentStatus
      ? childPref?.employmentStatus
      : [],
    countryOfResidence: childPref?.countryOfResidence
      ? childPref?.countryOfResidence
      : [],
    citizenship: childPref?.citizenship ? childPref?.citizenship : [],
    willingnessToRelocate: childPref?.willingnessToRelocate
      ? childPref?.maxWeight
      : null,
    patternOfSalat: childPref?.patternOfSalat ? childPref?.patternOfSalat : [],
    sect: childPref?.sect ? childPref?.sect : [],
    hasChildren: childPref?.hasChildren ? childPref?.hasChildren : null,
    isRevert: childPref?.isRevert ? childPref?.isRevert : null,
    isSmoker: childPref?.isSmoker ? childPref?.isSmoker : null,
    isDrinker: childPref?.isDrinker ? childPref?.isDrinker : null,
    hasAddictions: childPref?.hasAddictions ? childPref?.hasAddictions : null,
  };

  const sectOptions = [
    { label: "Sunni", value: "SUNNI" },
    { label: "Shi'a", value: "SHIA" },
  ];

  async function handleSubmit(values) {
    const newValues = {
      ...values,
      genotypes: selectedGenotype.map((item) => item.value),
      countryOfResidence: selectedCountries.map((item) => item.value),
      employmentStatus: selectedEmployment.map((item) => item.value),
      levelOfEducation: selectedLevelOfEdu.map((item) => item.value),
      citizenship: selectedCitizenship.map((item) => item.value),
      patternOfSalat: selectedSalat.map((item) => item.value),
      sect: selectedSect.map((item) => item.value),
      maritalStatus: selectedMaritalStatus.map((item) => item.value),
    };
    try {
      const res = Boolean(childPref)
        ? await updateFilter(newValues, token, childId)
        : await filterSuitors(newValues, token, childId);
      toast.success(res?.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <React.Fragment>
      <Box
        spacing={4}
        className="mx-auto px-8 py-12 box-shadow-style rounded-lg w-full"
      >
        <div className="flex flex-col text-center px-8 mb-8">
          <p className="font-semibold text-lg sm:text-2xl text-[#2D133A]">
            Set your preference
          </p>
          <p className="text-[#665e6b] text-base sm:text-lg">
            Choose what you want
          </p>
        </div>

        <div className="py-8 px-0 sm:px-8 w-full md:w-10/12 mx-auto flex flex-col items-center justify-center gap-10">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleSubmit }) => (
              <Form className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-wrap lg:flex-nowrap flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex items-center gap-5 w-full">
                    <TextInput
                      label="Min Age"
                      name="minAge"
                      type="text"
                      placeholder={childPref?.minAge}
                    />
                    <TextInput
                      label="Max Age"
                      name="maxAge"
                      type="text"
                      placeholder={childPref?.maxAge}
                    />
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
                      value={
                        childPref?.genotype
                          ? childPref?.genotype
                          : selectedGenotype
                      }
                      onChange={setSelectedGenotype}
                      labelledBy="Genotype"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                    <div className="flex items-center gap-5 w-full">
                      <TextInput
                        label="Min Height (m)"
                        name="minHeight"
                        placeholder={childPref?.minHeight}
                        type="number"
                      />
                      <TextInput
                        label="Max Height (m)"
                        name="maxHeight"
                        type="number"
                        placeholder={childPref?.maxHeight}
                      />
                    </div>

                    <div className="flex items-center gap-5 w-full">
                      <TextInput
                        label="Min Weight (kg)"
                        name="minWeight"
                        placeholder={childPref?.minWeight}
                        type="number"
                      />
                      <TextInput
                        label="Max Weight (kg)"
                        name="maxWeight"
                        placeholder={childPref?.maxWeight}
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4 justify-between">
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
                      overrideStrings={{
                        selectSomeItems:
                          selectedMaritalStatus.length > 0
                            ? selectedMaritalStatus
                                .map((item) => item.label)
                                .join(", ")
                            : childPref?.maritalStatus, // Fallback placeholder
                      }}
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
                      value={selectedCitizenship}
                      onChange={setSelectedCitizenship}
                      labelledBy="Citizenship"
                    />
                  </div>

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
                </div>

                <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-4">
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
                  <CheckboxInputTwo name="hasChildren">
                    Has Children
                  </CheckboxInputTwo>
                  <CheckboxInputTwo name="willingnessToRelocate">
                    Willing to relocate
                  </CheckboxInputTwo>
                  <CheckboxInputTwo name="isRevert">Revert</CheckboxInputTwo>
                  <CheckboxInputTwo name="isSmoker">Smokes</CheckboxInputTwo>
                  <CheckboxInputTwo name="isDrinker">Drinks</CheckboxInputTwo>
                  <CheckboxInputTwo name="hasAddictions">
                    Has an Addiction
                  </CheckboxInputTwo>
                </div>
                <div className="flex items-center w-full gap-3 sm:gap-0 justify-center sm:justify-between">
                  {showBackButton && (
                    <button
                      type="button" // This prevents form submission
                      className="my-11 mb-16 hover:bg-[#2D133A] border border-[#BA9FFE] rounded-lg h-11 text-[#2D133A] hover:text-white font-medium box-shadow-style transition-all duration-300 w-[250px]"
                      onClick={goBack}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300  w-[250px]"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </React.Fragment>
  );
};
