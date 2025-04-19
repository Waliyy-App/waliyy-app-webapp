import React from 'react';
import { TextArea } from '../../common/form';

export default function SelfSummaryForm() {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <div className="flex flex-col gap-10">
        <TextArea
          classname="w-full sm:w-[469px] "
          label="Tell us about you*"
          name="aboutYou"
          rows="10"
          placeholder={
            `Tell us about yourself and who you would like to marry. Tell us fun things about you, your hobbies and interests, your goals and aspirations, your relationship with your family, your current lifestyle and so on...

Note: Do not include personal information like your name, email address or phone number.`}
        />

        <TextArea
          classname="w-full sm:w-[469px] "
          rows="10"
          label="Tell us about your education and job*"
          name="aboutEducationAndJob"
        />

        <TextArea
          classname="w-full sm:w-[469px] "
          rows="10"
          label="Tell us how you dress*"
          name="dressing"
        />
      </div>
    </div>
  );
}
