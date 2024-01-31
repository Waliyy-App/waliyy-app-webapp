import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextArea } from '../../common/form';

const SummarySettings = ({ value, handleComplete }) => {
  const initialValues = {
    aboutYou: '',
    aboutEducationAndJob: '',
    dressing: '',
  };
  return (
    <CustomTabPanel value={value} index={4}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleComplete();
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="flex flex-col gap-10 px-8">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg text-[#2D133A]">Self Summary</p>
            <p className="text-[#667085] text-sm">
              Update your self summary here
            </p>
            <div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
          </div>

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

          <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

          <div className="w-full flex gap-8 justify-end items-center">
            <button className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
              Cancel
            </button>
            <button
              className="bg-[#BA9FFE] hover:bg-[#a37eff] text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </Formik>
    </CustomTabPanel>
  );
};

export default SummarySettings;
