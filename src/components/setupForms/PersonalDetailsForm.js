import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, MySelect } from '../../utils/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PersonalDetailsForm() {
  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    gender: '',
    genotype: '',
    height: '',
    weight: '',
    martialStatus: '',
    haveChildren: '',
    smoke: '',
    drink: '',
    addiction: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .required('Enter your first name'),
    lastName: Yup.string()
      .min(5, 'Must be 5 characters or more')
      .required('Enter your last name'),
    dateOfBirth: Yup.date()
      .nullable()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
    gender: Yup.string()
      .oneOf(['female', 'male'], 'Invalid Gender')
      .required('Select your gender'),
    genotype: Yup.string().required('Select your genotype'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    martialStatus: Yup.string().required('Marital Status is required'),
    haveChildren: Yup.string().required('This field is required'),
    smoke: Yup.string().required('This field is required'),
    drink: Yup.string().required('This field is required'),
    addiction: Yup.string().required('This field is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-10">
          <div className="flex justify-between gap-12">
            <TextInput label="First Name" name="firstName" type="text" />
            <TextInput label="Last Name" name="lastName" type="text" />
          </div>

          <div className="flex justify-between gap-12">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-2 text-[#2D133A]">
                Date of Birth
              </label>
              <DatePicker
                selected={values.dateOfBirth}
                onChange={(date) => setFieldValue('dateOfBirth', date)}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                placeholderText="mm-yyyy"
                className="text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
              />
            </div>
            <MySelect label="Gender" name="gender">
              <option value="">Select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </MySelect>
          </div>

          <div className="flex justify-between gap-12">
            <MySelect label="Genotype" name="genotype">
              <option value="">Select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </MySelect>

            <MySelect label="Height" name="height">
              <option value="">Select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </MySelect>

            <MySelect label="Weight" name="weight">
              <option value="">Select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </MySelect>
          </div>
        </Form>
      )}
    </Formik>
  );
}
