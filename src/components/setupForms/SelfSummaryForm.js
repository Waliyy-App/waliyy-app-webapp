import React from 'react';
import { Formik, Form } from 'formik';
import { TextArea } from '../../common/form';
import {
  summaryValidationSchema,
  summaryValues,
} from '../../data/inputInitialValues';
import ActionButton from './ActionButton';

export default function SelfSummaryForm({
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
      initialValues={summaryValues}
      validationSchema={summaryValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleComplete();
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <TextArea
            classname="w-full sm:w-[469px] "
            label="Tell us about you"
            name="aboutYou"
            placeholder="Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on..."
          />

          <TextArea
            classname="w-full sm:w-[469px] "
            label="Tell us about your education and job"
            name="aboutEducationAndJob"
          />

          <TextArea
            classname="w-full sm:w-[469px] "
            label="Tell us how you dress"
            name="dressing"
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
