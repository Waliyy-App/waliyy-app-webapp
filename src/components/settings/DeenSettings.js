import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import { Formik, Form } from 'formik';
import { TextInput, SelectInput, TextArea } from '../../common/form';

const DeenSettings = ({ value, handleComplete }) => {
  const initialValues = {
    revert: 'yes',
    sect: 'sunni',
    islamicOrganization: 'no',
    organizationType: '',
    speakers: 'N/A',
    startPractising: 'recent',
    salat: 'partialDaily',
    islamicPractice: '',
  };
  return (
    <CustomTabPanel value={value} index={3}>
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
        <Form className="flex flex-col gap-10 px-0 sm:px-8">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg text-[#2D133A]">About Deen</p>
            <p className="text-[#667085] text-sm">
              Update your deen information here
            </p>
            <div className="w-full h-[0.5px] bg-[#e4e7ec9c] mt-4 mb-12" />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-12">
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

          <div className="flex flex-col sm:flex-row justify-between gap-12">
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

          <div className="flex flex-col sm:flex-row justify-between gap-12">
            <TextInput
              type="text"
              label="Speakers/Scholars you listen to"
              name="speakers"
            />
            <SelectInput
              label="When did you start practicing?"
              name="startPractising"
            >
              <option value="">Select option</option>
              <option value="childhood">Childhood</option>
              <option value="adolescence">Adolescence</option>
              <option value="adulthood">Adulthood</option>
              <option value="recent">Recently</option>
              <option value="none">Not Practicing</option>
              <option value="notSaying">Prefer not to say</option>
            </SelectInput>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-12">
            <SelectInput label="Pattern of salat" name="salat">
              <option value="">Select option</option>
              <option value="5daily">I pray 5 times daily</option>
              <option value="partialDaily">
                I perform some of the daily prayers
              </option>
              <option value="occasionally">I pray occasionally</option>
              <option value="jumah">I regularly attend Friday prayers</option>
              <option value="specialOccasions">
                I mainly pray on special occasions
              </option>
              <option value="none">Not Practicing</option>
              <option value="notSaying">Prefer not to say</option>
            </SelectInput>

            <TextInput
              type="text"
              label="If yes, specify"
              name="relocationType"
              classname="hidden sm:flex sm:invisible"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-12">
            <TextArea
              label="Describe your Islamic practice"
              name="islamicPractice"
              placeholder="Tell us about your family’s relationship with Islam, upbringing, when you started practising, what are you currently learning about, how much Qur’an memorised..."
            />
            <TextInput
              label="something"
              name="something"
              classname="hidden sm:flex sm:invisible"
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

export default DeenSettings;
