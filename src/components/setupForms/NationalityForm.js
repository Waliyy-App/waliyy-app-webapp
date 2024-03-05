import React from 'react';
import { TextInput, SelectInput } from '../../common/form';
import { citizenshipOptions, countryOptions } from '../../data/formValues';

export default function NationalityForm(){
  return (
   <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Nationality" name="citizenship">
            <option value="">Select option</option>
            {citizenshipOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>

          <SelectInput label="Country of Residence" name="residence">
            <option value="">Select option</option>
            {countryOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput label="State of Origin" name="stateOfOrigin" type="text" />
          <TextInput label="LGA/County" name="lga" type="text" />
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


      </div>
  );
}
