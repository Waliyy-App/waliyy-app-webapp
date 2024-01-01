import * as Yup from 'yup';

export const personalDetailsValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  genotype: '',
  height: '',
  weight: '',
  maritalStatus: '',
  haveChildren: '',
  smoke: '',
  drink: '',
  addiction: '',
};

export const personalDetailsValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('Enter your first name'),
  lastName: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .required('Enter your last name'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future')
    .test('is-at-least-18', 'You must be at least 18 years old', function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();

      return age >= 18;
    }),
  gender: Yup.string()
    .oneOf(['female', 'male'], 'Invalid Gender')
    .required('Select your gender'),
  genotype: Yup.string().required('Select your genotype'),
  height: Yup.string().required('Height is required'),
  weight: Yup.string().required('Weight is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  haveChildren: Yup.string().required('This field is required'),
  smoke: Yup.string().required('This field is required'),
  drink: Yup.string().required('This field is required'),
  addiction: Yup.string().required('This field is required'),
});
