import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  genotype: "",
  height: "",
  weight: "",
  maritalStatus: "",
  haveChildren: "",
  polygamy:"",
  smoke: "",
  drink: "",
  addiction: "",
  citizenship: "",
  stateOfOrigin: "",
  lga: "",
  residence: "",
  mixedEthnicity: "",
  mixedEthnicityType: "",
  levelOfEducation: "",
  profession: "",
  employmentStatus: "",
  shortTermPlans: "",
  willingnessToRelocate: "",
  relocationType: "",
  revert: "",
  sect: "",
  islamicOrganization: "",
  organizationType: "",
  speakers: [],
  startedPracticingIn: "",
  salat: "",
  islamicPractice: "",
  aboutYou: "",
  aboutEducationAndJob: "",
  dressing: "",
};

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .required("Enter your first name"),
  lastName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .required("Enter your last name"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .test(
      "is-at-least-18",
      "You must be at least 18 years old",
      function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();

        return age >= 18;
      }
    ),
  gender: Yup.string()
    .oneOf(["FEMALE", "MALE"], "Invalid Gender")
    .required("Select your gender"),
  genotype: Yup.string().required("Select your genotype"),
  height: Yup.number().required("Height is required"),
  weight: Yup.number().required("Weight is required"),
  maritalStatus: Yup.string().required("Marital Status is required"),
  haveChildren: Yup.string().required("This field is required"),
  polygamy: Yup.string().required("This field is required"),
  smoke: Yup.string().required("This field is required"),
  drink: Yup.string().required("This field is required"),
  addiction: Yup.string().required("This field is required"),
  citizenship: Yup.string().required("Citizenship is required"),
  stateOfOrigin: Yup.string().required("State of origin is required"),
  lga: Yup.string().required("Select your LGA or County"),
  residence: Yup.string().required("Select your country of residence"),
  mixedEthnicity: Yup.string().required("This field is required"),
  // mixedEthnicityType: Yup.string().required('This field is required'),
  levelOfEducation: Yup.string().required("Select your level of education"),
  profession: Yup.string().required("Select your profession"),
  employmentStatus: Yup.string().required("Select your employment status"),
  shortTermPlans: Yup.string().required(
    "State your short and medium term plans"
  ),
  willingnessToRelocate: Yup.string().required("This field is required"),
  // relocationType: Yup.string().required('This field is required'),
  revert: Yup.string().required("Select an option"),
  sect: Yup.string().required("Select your sect"),
  islamicOrganization: Yup.string().required("This field is required"),
  // organizationType: Yup.string().required('This field is required'),
  // speakers: Yup.array().required('This field is required'),
  startedPracticingIn: Yup.string().required(
    "State when you started practising Islam"
  ),
  salat: Yup.string().required("Select your pattern of salat"),
  islamicPractice: Yup.string().required("Tell us about your Islamic practice"),
  aboutYou: Yup.string()
    .required("Tell us about you")
    .test(
      "minWords",
      "Your description must be at least 150 words",
      (value) => {
        if (!value) return false;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 150;
      }
    ),
  aboutEducationAndJob: Yup.string().required(
    "Tell us about your education and job"
  ),
  dressing: Yup.string().required("Tell us about your dressing"),
});
