import React from 'react';
import { TextInput, SelectInput, TextArea } from '../../common/form';
import {
  educationOptions,
  employmentStatusOptions,
} from '../../data/formValues';

export default function EducationAndProfessionForm(){
  return (
     <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Level of Education" name="levelOfEducation">
            <option value="">Select option</option>
            {educationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>

          <TextInput label="Profession" name="profession" type="text" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Employment Status" name="employmentStatus">
            <option value="">Select option</option>
            {employmentStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
  );
}
