import React from 'react';
import { TextInput, SelectInput } from '../../common/form';
import {
  genotypeOption,
  heightRanges,
  maritalStatusOption,
  weightRanges,
} from '../../data/formValues';

export default function PersonalDetailsForm() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <TextInput label="First Name" name="firstName" type="text" />
        <TextInput label="Last Name" name="lastName" type="text" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <TextInput label="Date of Birth" name="dateOfBirth" type="date" />
        <SelectInput label="Gender" name="gender">
          <option value="">Select option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectInput>
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
          {maritalStatusOption.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
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
            <SelectInput label="Smoke?" name="smoke">
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </SelectInput>
            <SelectInput label="Drink?" name="drink">
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </SelectInput>
            <SelectInput label="Have any addiction?" name="addiction">
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </SelectInput>
          </div>
        </div>

      </div>
   
  );
}
