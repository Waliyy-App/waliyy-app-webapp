import React from 'react';
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

        <div className="flex flex-col w-full">
          <TextInput
            label="Height (m)*"
            name="height"
            type="number"
            placeholder="Height must be in metres"
          />
          <a
            href="https://www.thecalculatorsite.com/conversions/common/height-converter.php"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium"
          >
            Click here to convert to metres
          </a>
        </div>

        <div className="flex flex-col w-full">
          <TextInput
            label="Weight (kg)*"
            name="weight"
            type="number"
            placeholder="Weight must be in kilogram"
          />
          <a
            href="https://www.thecalculatorsite.com/conversions/common/weight-converter.php"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium"
          >
            Click here to convert to kilogram
          </a>
        </div>
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
