import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="w-4/5 max-w-[1215px] mx-auto my-24">
      <p className="text-center text-3xl font-bold mb-20 text-[#2D133A]">
        How It Works
      </p>
      <div className="flex flex-col sm:grid grid-cols-2 gap-y-1 sm:gap-y-24 h-full">
        <div className="bg-[#b294ff37] text-[#BA9FFE] h-[54px] w-[54px] mx-auto rounded-full flex items-center justify-center font-semibold text-2xl mb-10 sm:mb-0">
          1
        </div>
        <div className="flex flex-col w-full mb-16 sm:mb-0 justify-between">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xl font-bold text-[#2D133A]">
              Create an Account
            </p>
            <p>
              Your journey begins with a simple step: Click the "Sign Up" button
              at the top right corner of our homepage. Provide some basic
              information, then check your email for a welcome message with a
              unique verification code. Enter this code to activate your account
              and ensure your security.
            </p>
          </div>
        </div>

        <div className="bg-[#b294ff37] text-[#BA9FFE] h-[54px] w-[54px] mx-auto rounded-full flex items-center justify-center font-semibold text-2xl mb-10 sm:mb-0 col-start-2 col-end-3">
          2
        </div>

        <div className="flex flex-col w-full mb-16 sm:mb-0 justify-between col-start-1 col-end-2 row-start-4">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xl font-bold text-[#2D133A]">
              Complete your Profile
            </p>
            <p>
              Personalize your Waliyy App experience by completing your profile.
              Provide information about yourself, such as your background,
              hobbies, and interests. This helps others get to know you better
              and enhances your experience within the app.
            </p>
          </div>
        </div>

        <div className="bg-[#b294ff37] text-[#BA9FFE] h-[54px] w-[54px] mx-auto rounded-full flex items-center justify-center font-semibold text-2xl mb-10 sm:mb-0">
          3
        </div>

        <div className="flex flex-col w-full mb-16 sm:mb-0 justify-between">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xl font-bold text-[#2D133A]">
              Customize your Dashboard
            </p>
            <p>
              Filling out your profile fully and setting your preferences allows
              our platform to tailor recommendations to suit your preferences,
              ensuring a more engaging and relevant experience.
            </p>
          </div>
        </div>

        <div className="bg-[#b294ff37] text-[#BA9FFE] h-[54px] w-[54px] mx-auto rounded-full flex items-center justify-center font-semibold text-2xl mb-10 sm:mb-0 col-start-2 col-end-3">
          4
        </div>

        <div className="flex flex-col w-full mb-16 sm:mb-0 justify-between col-start-1 col-end-2 row-start-2">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xl font-bold text-[#2D133A]">
              Activate your Account
            </p>
            <p>
              Choose the plan that best suits your needs to unlock all the
              features and benefits our platform has to offer by heading to our
              <Link to="/pricing" className="font-bold">
                {' '}
                pricing page
              </Link>
              . Once your subscription is confirmed, your account will be fully
              activated, allowing you to make the most of your Waliyy App
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
