import React from 'react';
import FormikStepper from 'react-formik-stepper';
import {
  EducationAndProfessionForm,
  NationalityForm,
  PersonalDetailsForm,
  SelfSummaryForm,
} from '../components/setupForms';

export const ProfileSetupV = () => {
  return (
    <FormikStepper
    animate={false}
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      <PersonalDetailsForm />
      <NationalityForm />
      <EducationAndProfessionForm />
      <SelfSummaryForm />
    </FormikStepper>
  );
};
