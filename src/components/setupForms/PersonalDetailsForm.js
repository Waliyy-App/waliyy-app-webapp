import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput } from '../../common/form';
import {
  personalDetailsValidationSchema,
  personalDetailsValues,
} from '../../data/inputInitialValues';
import { heightRanges, weightRanges } from '../../data/formValues';
import ActionButton from './ActionButton';


export default function PersonalDetailsForm({
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
      initialValues={personalDetailsValues}
      validationSchema={personalDetailsValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleComplete();
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="flex flex-col gap-10">
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
