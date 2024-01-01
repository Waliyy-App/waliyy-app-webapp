import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import UserIcon from '@mui/icons-material/Person';
import WorldIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import MosqueIcon from '@mui/icons-material/Mosque';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import CongratulationsRegister from '../screens/CongratulationsRegister';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import { TextInput, SelectInput, TextArea } from '../common/form';
import {
  personalDetailsValidationSchema,
  personalDetailsValues,
} from '../data/inputInitialValues';
import { heightRanges, weightRanges } from '../data/formValues';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <UserIcon />,
    2: <WorldIcon />,
    3: <SchoolIcon />,
    4: <MosqueIcon />,
    5: <RecordVoiceOverIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The index of the step.
   */
  icon: PropTypes.number,
};

const steps = [
  'Personal Details',
  'Nationality and Heritage',
  'Education and Profession',
  'About my Deen',
  'Self Summary',
];

export default function ProfileSetup() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  // const forms = [
  //   (props) => <PersonalDetailsForm {...props} />,
  //   (props) => <NationalityForm {...props} />,
  //   (props) => <EducationAndProfessionForm {...props} />,
  //   (props) => <AboutDeenForm {...props} />,
  //   (props) => <SelfSummaryForm {...props} />,
  // ];

  const PersonalDetails = (
    <React.Fragment>
      <div className="flex justify-between gap-12">
        <TextInput label="First Name" name="firstName" type="text" />
        <TextInput label="Last Name" name="lastName" type="text" />
      </div>

      <div className="flex justify-between gap-12">
        <TextInput label="Date of Birth" name="dateOfBirth" type="date" />
        <SelectInput label="Gender" name="gender">
          <option value="">Select option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectInput>
      </div>

      <div className="flex justify-between gap-12">
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

      <div className="flex justify-between gap-12">
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
        <div className="flex justify-between gap-12">
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
    </React.Fragment>
  );

  const NationalityDetails = (
    <React.Fragment>
      <div className="flex justify-between gap-12">
        <SelectInput label="Citizenship" name="citizenship">
          <option value="">Select option</option>
          <option value="Nigerian">Nigerian</option>
          <option value="British">British</option>
        </SelectInput>

        <SelectInput label="State of Origin" name="stateOfOrigin">
          <option value="">Select option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectInput>
      </div>

      <div className="flex justify-between gap-12">
        <SelectInput label="LGA/County" name="lga">
          <option value="">Select option</option>
          <option value="Nigerian">Nigerian</option>
          <option value="British">British</option>
        </SelectInput>

        <SelectInput label="Country of Residence" name="residence">
          <option value="">Select option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectInput>
      </div>

      <div className="flex justify-between gap-12">
        <SelectInput label="Are you mixed ethnicity" name="mixedEthnicity">
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectInput>

        <TextInput
          type="text"
          label="If yes, specify"
          name="mixedEhnicityType"
        />
      </div>
    </React.Fragment>
  );

  const EducationDetails = (
    <React.Fragment>
      <div className="flex justify-between gap-12">
        <SelectInput label="Level of Education" name="education">
          <option value="">Select option</option>
          <option value="Nigerian">Nigerian</option>
          <option value="British">British</option>
        </SelectInput>

        <SelectInput label="Profession" name="profession">
          <option value="">Select option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectInput>
      </div>

      <div className="flex justify-between gap-12">
        <SelectInput label="Employment Status" name="employmentStatus">
          <option value="">Select option</option>
          <option value="Nigerian">Nigerian</option>
          <option value="British">British</option>
        </SelectInput>
        <TextInput label="something" name="something" classname="invisible" />
      </div>

      <div className="flex justify-between gap-12">
        <TextArea
          label="What are you short/medium term qualification and professional plans?"
          name="shortTermPlans"
          placeHolder="Enter..."
        />
        <TextInput label="something" name="something" classname="invisible" />
      </div>

      <div className="flex justify-between gap-12">
        <SelectInput
          label="Are you willing to relocate?"
          name="willingnessToRelocate"
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectInput>

        <TextInput type="text" label="If yes, specify" name="relocationType" />
      </div>
    </React.Fragment>
  );

  const DeenDetails = (
    <React.Fragment>
      <div className="flex justify-between gap-12">
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

      <div className="flex justify-between gap-12">
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
        />
      </div>

      <div className="flex justify-between gap-12">
        <TextInput
          type="text"
          label="Speakers/Scholars you listen to"
          name="speakers"
        />
        <SelectInput
          label="When did you start practising?"
          name="startPractising"
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectInput>
      </div>

      <div className="flex justify-between gap-12">
        <SelectInput label="Pattern of salat" name="salat">
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectInput>

        <TextInput
          type="text"
          label="If yes, specify"
          name="relocationType"
          classname="invisible"
        />
      </div>

      <div className="flex justify-between gap-12">
        <TextArea
          label="Describe your Islamic practice"
          name="shortTermPlans"
          placeHolder="Tell us about your family’s relationship with Islam, upbringing, when you started practising, what are you currently learning about, how much Qur’an memorised..."
        />
        <TextInput label="something" name="something" classname="invisible" />
      </div>
    </React.Fragment>
  );

  const SummaryDetails = (
    <div className="flex flex-col gap-10">
      <TextArea
        classname="w-full sm:w-[469px] "
        label="Tell us about you"
        name="aboutYou"
        placeHolder="Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on..."
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
  );

  const forms = [
    PersonalDetails,
    NationalityDetails,
    EducationDetails,
    DeenDetails,
    SummaryDetails,
  ];
  return (
    <React.Fragment>
      {allStepsCompleted() ? (
        <CongratulationsRegister />
      ) : (
        <Box
          sx={{ width: '80%' }}
          spacing={4}
          className="mx-auto px-8 py-12 box-shadow-style rounded-lg"
        >
          <div className="flex flex-col px-8 mb-8">
            <p className="font-semibold text-2xl text-[#2D133A]">
              Setup your Account
            </p>
            <p className="text-[#665e6b] text-lg">Tell us about your ward</p>
          </div>
          <Stepper
            alternativeLabel
            nonLinear
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className="p-8 w-11/12 mx-auto flex flex-col gap-10">
            <Formik
              initialValues={personalDetailsValues}
              validationSchema={personalDetailsValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleComplete();
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="flex flex-col gap-10">
                {forms[activeStep]}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                      color: 'black',
                      width: '150px',
                      paddingY: '10px',
                      borderRadius: '8px',
                      fontWeight: 'medium',
                      fontFamily: 'Nunito',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      border: '1px solid #BA9FFE',
                      textTransform: 'capitalize',
                      fontSize: '16px',
                    }}
                  >
                    <FaChevronLeft /> Back
                  </Button>

                  <Box sx={{ flex: '1 1 auto' }} />

                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: 'inline-block' }}
                      >
                        {steps[activeStep]} completed
                        <button
                          onClick={() => {
                            handleComplete();
                            handleNext();
                          }}
                          className="ml-2 bg-[#BA9FFE] text-white w-auto py-[10px] px-[18px] rounded-lg font-medium"
                          type="submit"
                        >
                          <FaChevronRight />
                        </button>
                      </Typography>
                    ) : (
                      <button
                        className="bg-[#BA9FFE] text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center gap-1"
                        onClick={handleComplete}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Next'}{' '}
                        <FaChevronRight />
                      </button>
                    ))}
                </Box>
              </Form>
            </Formik>
          </div>
        </Box>
      )}
    </React.Fragment>
  );
}
