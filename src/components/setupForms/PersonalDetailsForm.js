import React, { useState } from 'react';
import { TextInput, SelectInput } from '../../common/form';
import { genotypeOption, maritalStatusOption } from '../../data/formValues';

export default function PersonalDetailsForm() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <TextInput label="First Name*" name="firstName" type="text" />
        <TextInput label="Last Name*" name="lastName" type="text" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <TextInput label="Date of Birth*" name="dateOfBirth" type="date" />
        <SelectInput label="Gender*" name="gender">
          <option value="">Select option</option>
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
        </SelectInput>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <SelectInput label="Genotype*" name="genotype">
          <option value="">Select option</option>
          {genotypeOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>

        <div className="flex flex-col">
          <p className="text-sm font-medium mb-0 text-[#2D133A]">Height(in)*</p>
          <div className="flex items-center gap-3">
            <TextInput name="feet" type="number" placeholder="feet" />
            <TextInput name="inches" type="number" placeholder="inches" />
          </div>
        </div>

        <TextInput
          label="Weight (kg)*"
          name="weight"
          type="number"
          placeholder="Weight must be in kilogram"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-12">
        <SelectInput label="Marital Status*" name="maritalStatus">
          <option value="">Select option</option>
          {maritalStatusOption.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>

        <SelectInput label="Do you have children?*" name="haveChildren">
          <option value="">Select option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </SelectInput>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[#665e6b] text-lg font-semibold">Do you...</p>
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Smoke?*" name="smoke">
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectInput>
          <SelectInput label="Drink?*" name="drink">
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectInput>
          <SelectInput label="Have any addiction?*" name="addiction">
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectInput>
        </div>
      </div>
    </div>
  );
}
