import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, TextArea } from '../../common/form';
import {
  educationValidationSchema,
  educationValues,
} from '../../data/inputInitialValues';
import ActionButton from './ActionButton';
import {
  educationOptions,
  employmentStatusOptions,
} from '../../data/formValues';

export default function EducationAndProfessionForm({
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
      initialValues={educationValues}
      validationSchema={educationValidationSchema}
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
          <SelectInput label="Level of Education" name="levelOfEducation">
            <option value="">Select option</option>
            {educationOptions.map((option) => (
              <option key={option.id} value={option.value}>
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
              <option key={option.id} value={option.value}>
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
            placeholder="If no, input N/A"
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
