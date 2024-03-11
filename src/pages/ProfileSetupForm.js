import React, { useState } from "react";
import Box from "@mui/material/Box";
import CongratulationsRegister from "../screens/CongratulationsRegister";
import { Formik, Form } from "formik";
import UserIcon from "@mui/icons-material/Person";
import WorldIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import MosqueIcon from "@mui/icons-material/Mosque";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { initialValues, validationSchema } from "../data/inputInitialValues";
import {
  AboutDeenForm,
  EducationAndProfessionForm,
  NationalityForm,
  PersonalDetailsForm,
  SelfSummaryForm,
} from "../components/setupForms";
import { userRegistration, isAuthenticated } from "../services";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProfileSetupForm() {
  const [activeStep, setActiveStep] = useState("personalDetails");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const handleSubmit = async (values) => {
    setLoading(true);
    const date = new Date(values.dateOfBirth);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth();

    try {
      await userRegistration(
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
          speakersListenedTo: values.speakers,
          startedPracticingIn: values.startPracticing,
          salatPattern: values.salat,
          descriptionOfIslamicPractice: values.islamicPractice,
          about: values.aboutou,
          aboutEducationAndJob: values.aboutEducationAndJob,
          aboutDressing: values.dressing,
        },
        token
      );

      console.log(values, "success");
      //   setCompleted(true);
    } catch (error) {
      alert(error.response.data.message);
    }

    setLoading(false);
  };

  if (!isAuthenticated()) {
    navigate("/");
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : completed ? (
        <CongratulationsRegister />
      ) : (
        <Box
          spacing={4}
          className="mx-auto px-8 py-12 w-full md:w-4/5 transition-all duration-500"
        >
          <div className="flex flex-col mb-8">
            <p className="font-semibold text-2xl text-[#2D133A]">
              Setup your Account
            </p>
            <p className="text-[#665e6b] text-lg">Tell us about your ward</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="transition-all duration-500 flex gap-8 flex-col">
              <div>
                <div
                  className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                  onClick={() => setActiveStep("personalDetails")}
                >
                  <UserIcon />
                  Personal Details
                </div>
                {activeStep === "personalDetails" ? (
                  <PersonalDetailsForm />
                ) : (
                  ""
                )}
              </div>
              <div>
                <div
                  className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                  onClick={() => setActiveStep("nationality")}
                >
                  <WorldIcon />
                  Nationality
                </div>
                {activeStep === "nationality" ? <NationalityForm /> : ""}
              </div>
              <div>
                <div
                  className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                  onClick={() => setActiveStep("education")}
                >
                  <SchoolIcon />
                  Education and Profession
                </div>
                {activeStep === "education" ? (
                  <EducationAndProfessionForm />
                ) : (
                  ""
                )}
              </div>
              <div>
                <div
                  className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                  onClick={() => setActiveStep("deen")}
                >
                  <MosqueIcon />
                  About my Deen
                </div>
                {activeStep === "deen" ? <AboutDeenForm /> : ""}
              </div>
              <div>
                <div
                  className="flex items-center transition-all duration-500 gap-3 mb-5 cursor-pointer text-lg bg-[#2D133A] text-[#FFF4F6] p-4 rounded-lg"
                  onClick={() => setActiveStep("summary")}
                >
                  <RecordVoiceOverIcon />
                  Self Summary
                </div>
                {activeStep === "summary" ? <SelfSummaryForm /> : ""}
              </div>

              <button
                className="my-11 mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
                type="submit"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </Box>
      )}
    </React.Fragment>
  );
}
