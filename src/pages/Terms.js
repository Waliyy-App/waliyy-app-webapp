import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa]">
      <Navbar />

      <div className="w-11/12 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
              Terms and Conditions
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Last updated: June 28, 2025
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-8">
              <p className="italic text-gray-700 m-0">
                WaliyyApp is dedicated to single Muslims of Nigerian heritage
                who are seriously searching for spouses in a halal and
                respectful manner. As such it is expected that subscribers fully
                engage on the platform.
              </p>
            </div>

            <div className="space-y-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((section) => (
                <div
                  key={section}
                  className="border-l-2 border-purple-100 pl-4 md:pl-6"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-3">
                    {section}. {sectionTitles[section - 1]}
                  </h2>
                  <div className="text-gray-700">{sectionContent(section)}</div>
                </div>
              ))}

              {/* Agreement */}
              <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-800 mb-3">
                  Agreement
                </h2>
                <p className="text-indigo-700 mb-2">
                  By creating an account or using WaliyyApp, you agree to be
                  bound by these Terms and Conditions.
                </p>
                <p className="text-indigo-700">
                  You also agree to receive messages via Email, Whatsapp and SMS from WaliyyApp as part of your use of the
                  platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Register */}
        <div className="text-center mb-10">
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-auto sm:w-[340px] mx-auto rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Registration
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Section titles
const sectionTitles = [
  "Eligibility",
  "Engagement Expectations",
  "Personal Information",
  "User Responsibilities",
  "Content and Data Usage",
  "No Guarantees",
  "Limitation of Liability",
  "Account Suspension/Termination",
  "Modifications",
  "Governing Law"
];

// Section content
const sectionContent = (section) => {
  switch(section) {
    case 1:
      return <p>You must be at least 18 years old and legally permitted to marry under your local laws before signing up.</p>;
    case 2:
      return (
        <>
          <p className="mb-4">WaliyyApp sincerely encourages young sisters to involve and follow sunnah and the guidance of their waliyy/mahram during the marriage process.</p>
          <p>Non response to 'likes' (or direct emails) will result in your account being suspended or deleted as WaliyyApp will assume it is a dummy account AI or generated.</p>
        </>
      );
    case 3:
      return <p>Personal information such as names, email addresses and telephone numbers are not permitted on the platform. Failure to comply will lead to WaliyyApp taking action.</p>;
    case 4:
      return (
        <>
          <p className="mb-4">You agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Be truthful in all information provided</li>
            <li>Use the platform solely for the purpose of seeking marriage</li>
            <li>Treat others respectfully and without harassment</li>
          </ul>
        </>
      );
    case 5:
      return <p>You are solely responsible for the information you provide on the platform and WaliyyApp reserves the right to use such material within the app and for marketing purposes. Your data will be handled diligently and no personal data will be sold to third parties.</p>;
    case 6:
      return <p>WaliyyApp does not guarantee you will find a match or get married through the app. The app only facilitates introductions, but success depends on your interactions.</p>;
    case 7:
      return (
        <>
          <p className="mb-4">WaliyyApp is not liable for any emotional, financial, or personal losses resulting from:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your use of the app</li>
            <li>Misuse of any information by other users</li>
            <li>Deception displayed by subscribers</li>
          </ul>
        </>
      );
    case 8:
      return (
        <>
          <p className="mb-4">WaliyyApp reserves the right to suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>You violate these terms and conditions</li>
            <li>You provide misleading information</li>
            <li>You harass other members</li>
            <li>You use the app for non-marital or commercial purposes</li>
          </ul>
        </>
      );
    case 9:
      return <p>We reserve the right to modify these Terms and Conditions at any time. Continued use of the app constitutes acceptance of any changes.</p>;
    case 10:
      return <p>These terms are governed by the laws of Nigeria.</p>;
    default:
      return null;
  }
};

export default Terms;
