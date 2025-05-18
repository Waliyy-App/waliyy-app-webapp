import React, { lazy, Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import UserIcon from '@mui/icons-material/Person';
import WorldIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import MosqueIcon from '@mui/icons-material/Mosque';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

import { initialValues, validationSchema } from '../data/initialValues';
import { useAuthContext } from '../context/AuthContext';
import { userRegistration } from '../services/index.js';

const CongratulationsRegister = lazy(() =>
  import('../screens/CongratulationsRegister')
);
const Loader = lazy(() => import('../components/Loader'));
const PersonalDetailsForm = lazy(() =>
  import('../components/setupForms/PersonalDetailsForm')
);
const NationalityForm = lazy(() =>
  import('../components/setupForms/NationalityForm')
);
const EducationAndProfessionForm = lazy(() =>
  import('../components/setupForms/EducationAndProfessionForm')
);
const AboutDeenForm = lazy(() =>
  import('../components/setupForms/AboutDeenForm')
);
const SelfSummaryForm = lazy(() =>
  import('../components/setupForms/SelfSummaryForm')
);

const formSections = [
  {
    id: 'personalDetails',
    icon: <UserIcon />,
    label: 'Personal Details',
    component: PersonalDetailsForm,
  },
  {
    id: 'nationality',
    icon: <WorldIcon />,
    label: 'Nationality',
    component: NationalityForm,
  },
  {
    id: 'education',
    icon: <SchoolIcon />,
    label: 'Education and Profession',
    component: EducationAndProfessionForm,
  },
  {
    id: 'deen',
    icon: <MosqueIcon />,
    label: 'About my Deen',
    component: AboutDeenForm,
  },
  {
    id: 'summary',
    icon: <RecordVoiceOverIcon />,
    label:
      'Self Summary',
    component: SelfSummaryForm,
  },
];

export default function ProfileSetupForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.state?.from !== '/login-successful';

  const goBack = () => {
    navigate(-1);
  };

  const [state, setState] = useState({
    activeStep: '',
    completed: false,
    loading: false,
  });
  const { token, handleChildId } = useAuthContext();

  const handleSubmit = async (values) => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const date = new Date(values.dateOfBirth);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;

    const speakers = Array.isArray(values.speakers)
      ? values.speakers
      : values.speakers.split(',').map((item) => item.trim());

    try {
      const res = await userRegistration(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          yearOfBirth: getYear,
          monthOfBirth: getMonth,
          gender: values.gender,
          genotype: values.genotype,
          height: values.height,
          weight: values.weight,
          maritalStatus: values.maritalStatus,
          hasChildren: values.haveChildren,
          isSmoker: values.smoke,
          isDrinker: values.drink,
          hasAddictions: values.addiction,
          citizenship: values.citizenship,
          state: values.stateOfOrigin,
          lga: values.lga,
          countryofResidence: values.residence,
          isMixedEthnicity: values.mixedEthnicity,
          mixedEthnicityDescription: values.mixedEthnicityType,
          educationLevel: values.levelOfEducation,
          profession: values.profession,
          employmentStatus: values.employmentStatus,
          professionalPlans: values.shortTermPlans,
          isWillingToRelocate: values.willingnessToRelocate,
          relocationPlans: values.relocationType,
          isARevert: values.revert,
          sect: values.sect,
          belongsToIslamicOrganization: values.islamicOrganization,
          islamicOrganizationName: values.organizationType,
          speakersListenedTo: speakers,
          startedPracticingIn: values.startedPracticingIn,
          salatPattern: values.salat,
          descriptionOfIslamicPractice: values.islamicPractice,
          about: values.aboutYou,
          aboutEducationAndJob: values.aboutEducationAndJob,
          aboutDressing: values.dressing,
        },
        token
      );
      handleChildId(res?.data);
      toast.success(res?.message);
      setState((prevState) => ({ ...prevState, completed: true }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const renderForm = () => {
    const { activeStep, loading, completed } = state;
    console.log(activeStep);

    if (loading) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Loader />
        </Suspense>
      );
    }

    if (completed) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <CongratulationsRegister />
        </Suspense>
      );
    }

    return (
      <Box
        spacing={4}
        className="mx-auto px-8 py-12 w-full md:w-4/5 transition-all duration-500"
      >
        <div className="flex flex-col mb-8">
          <p className="font-semibold text-2xl text-[#2D133A]">
            Tell us about your single
          </p>
          <p className="text-[#665e6b] text-lg">Setup the Account</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="transition-all duration-500 flex gap-8 flex-col">
            {formSections.map(
              ({ id, icon, label, component: FormComponent }) => (
                <div key={id}>
                  <div
                    className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        activeStep: id,
                      }))
                    }
                  >
                    {icon}
                    {label}
                  </div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <FormComponent />
                  </Suspense>
                </div>
              )
            )}
            <div className="flex items-center w-full justify-between">
              {showBackButton && (
                <button
                  type="button"
                  className="my-11 mb-16 hover:bg-[#2D133A] border border-[#BA9FFE] rounded-lg h-11 text-[#2D133A] hover:text-white font-medium box-shadow-style transition-all duration-300 w-[250px]"
                  onClick={goBack}
                >
                  Back
                </button>
              )}
              <button
                className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300  w-[250px]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </Box>
    );
  };

  return <React.Fragment>{renderForm()}</React.Fragment>;
}
