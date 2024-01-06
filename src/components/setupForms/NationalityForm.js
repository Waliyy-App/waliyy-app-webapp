import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput } from '../../common/form';
import {
  nationalityValidationSchema,
  nationalityValues,
} from '../../data/inputInitialValues';
import ActionButton from './ActionButton';

export default function NationalityForm({
  activeStep,
  handleBack,
  steps,
  handleComplete,
  handleNext,
  totalSteps,
  completedSteps,
  completed,
}) {
  return (
    <Formik
      initialValues={nationalityValues}
      validationSchema={nationalityValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleComplete();
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="flex flex-col gap-10">
        <div className="flex justify-between gap-12">
          <SelectInput label="Citizenship" name="citizenship">
            <option value="">Select option</option>
            <option value="Nigerian">Nigerian</option>
            <option value="British">British</option>
          </SelectInput>

          <SelectInput label="State of Origin" name="stateOfOrigin">
            <option value="">Select option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </SelectInput>
        </div>

        <div className="flex justify-between gap-12">
          <SelectInput label="LGA/County" name="lga">
            <option value="">Select option</option>
            <option value="Nigerian">Nigerian</option>
            <option value="British">British</option>
          </SelectInput>

          <SelectInput label="Country of Residence" name="residence">
            <option value="">Select option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </SelectInput>
        </div>

        <div className="flex justify-between gap-12">
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

        <ActionButton
          activeStep={activeStep}
          handleBack={handleBack}
          steps={steps}
          handleComplete={handleComplete}
          handleNext={handleNext}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          completed={completed}
        />
      </Form>
    </Formik>
  );
}
