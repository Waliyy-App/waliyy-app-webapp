import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, TextArea } from '../../common/form';
import {
  deenValidationSchema,
  deenValues,
} from '../../data/inputInitialValues';
import ActionButton from './ActionButton';
import { salatOptions } from '../../data/formValues';

export default function AboutDeenForm({
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
      initialValues={deenValues}
      validationSchema={deenValidationSchema}
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
          <SelectInput label="Are you a revert?" name="revert">
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </SelectInput>

          <SelectInput label="Are you Sunni or Shi'a" name="sect">
            <option value="">Select option</option>
            <option value="sunni">Sunni</option>
            <option value="Shi'a">Shi'a</option>
          </SelectInput>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput
            label="Do you belong to any Islamic Organization?"
            name="islamicOrganization"
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </SelectInput>

          <TextInput
            type="text"
            label="If yes, specify"
            name="organizationType"
            placeholder='If no, input N/A'
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput
            type="text"
            label="Speakers/Scholars you listen to"
            name="speakers"
          />
          <SelectInput
              label="When did you start practicing?"
              name="startPractising"
            >
              <option value="">Select option</option>
              <option value="childhood">Childhood</option>
              <option value="adolescence">Adolescence</option>
              <option value="adulthood">Adulthood</option>
              <option value="recent">Recently</option>
              <option value="none">Not Practicing</option>
            </SelectInput>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
           <SelectInput label="Pattern of salat" name="salat">
              <option value="">Select option</option>
             {salatOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
            </SelectInput>

          <TextInput
            type="text"
            label="If yes, specify"
            name="relocationType"
            classname="hidden sm:flex sm:invisible"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextArea
            label="Describe your Islamic practice"
            name="islamicPractice"
            placeholder="Tell us about your family’s relationship with Islam, upbringing, when you started practising, what are you currently learning about, how much Qur’an memorised..."
          />
          <TextInput label="something" name="something" classname="hidden sm:flex sm:invisible" />
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
