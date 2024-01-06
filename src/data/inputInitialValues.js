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

export const nationalityValues = {
  citizenship: '',
  stateOfOrigin: '',
  lga: '',
  residence: '',
  mixedEthnicity: '',
  mixedEthnicityType: '',
};

export const educationValues = {
  levelOfEducation: '',
  profession: '',
  employmentStatus: '',
  shortTermPlans: '',
  willingnessToRelocate: '',
  relocationType: '',
};

export const deenValues = {
  revert: '',
  sect: '',
  islamicOrganization: '',
  organizationType: '',
  speakers: '',
  startPractising: '',
  
  islamicPractice: '',
};

export const summaryValues = {
  aboutYou: '',
  aboutEducationAndJob: '',
  dressing: '',
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
    .test(
      'is-at-least-18',
      'You must be at least 18 years old',
      function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();

        return age >= 18;
      }
    ),
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

export const nationalityValidationSchema = Yup.object({
  citizenship: Yup.string().required('Citizenship is required'),
  stateOfOrigin: Yup.string().required('State of origin is required'),
  lga: Yup.string().required('Select your LGA or County'),
  residence: Yup.string().required('Select your country of residence'),
  mixedEthnicity: Yup.string().required('This field is required'),
  mixedEthnicityType: Yup.string().required('This field is required'),
});

export const educationValidationSchema = Yup.object({
  levelOfEducation: Yup.string().required('Select your level of education'),
  profession: Yup.string().required('Select your profession'),
  employmentStatus: Yup.string().required('Select your employment status'),
  shortTermPlans: Yup.string().required(
    'State your short and medium term plans'
  ),
  willingnessToRelocate: Yup.string().required('This field is required'),
  relocationType: Yup.string().required('This field is required'),
});

export const deenValidationSchema = Yup.object({
  revert: Yup.string().required('Select an option'),
  sect: Yup.string().required('Select your sect'),
  islamicOrganization: Yup.string().required('This field is required'),
  organizationType: Yup.string().required('This field is required'),
  speakers: Yup.string().required('This field is required'),
  startPractising: Yup.string().required(
    'State when you started practising Islam'
  ),
  salat: Yup.string().required('Select your pattern of salat'),
  islamicPractice: Yup.string().required('Tell us about your Islamic practice'),
});

export const summaryValidationSchema = Yup.object({
  aboutYou: Yup.string().required('Tell us about you'),
  aboutEducationAndJob: Yup.string().required(
    'Tell us about your education and job'
  ),
  dressing: Yup.string().required('Tell us about your dressing'),
});
