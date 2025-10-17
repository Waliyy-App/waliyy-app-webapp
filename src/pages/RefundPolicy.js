import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { Link } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa]">
      <Navbar />

      <div className="w-11/12 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
           <div className="flex justify-center items-center gap-2">
                       <FiRefreshCcw className="text-2xl text-indigo-700" />
                   <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
                   Refund Policy
                   </h1>
              </div>
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
                WaliyyApp strives to provide a high-quality experience for all users. 
                Please note that all payments made on WaliyyApp are <strong>non-refundable</strong>.
              </p>
            </div>

            <div className="space-y-10">
              {[1, 2, 3, 4].map((section) => (
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

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-800 mb-3">
                  Contact Support
                </h2>
                <p className="text-indigo-700 mb-2">
                  If you experience any issues or believe you were charged in error, 
                  please contact our support team at 
                  <a
                    href="mailto:admin@waliyyapp.com"
                    className="text-purple-600 underline ml-1"
                  >
                    admin@waliyyapp.com
                  </a>{' '}
                  within 7 days of the transaction for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Registration */}
        <div className="text-center mb-10">
          <Link
            to="/"
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
            Back to Home page
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Section titles
const sectionTitles = [
  'Non-Refundable Payments',
  'User Responsibility',
  'Exceptional Circumstances',
  'Acknowledgement and Agreement',
];

// Section content
const sectionContent = (section) => {
  switch (section) {
    case 1:
      return (
        <p>
          All payments made on WaliyyApp, including subscription fees and renewals, 
          are <strong>non-refundable</strong>. No refunds will be issued regardless of 
          your usage level, interaction with other users, or account activity.
        </p>
      );
    case 2:
      return (
        <p>
          It is your responsibility to review and understand the features of WaliyyApp 
          before completing any payment. Please ensure that you have read our terms and 
          policies thoroughly before subscribing.
        </p>
      );
    case 3:
      return (
        <p>
          In exceptional cases such as duplicate transactions or verified technical 
          errors, WaliyyApp may consider refunds at its sole discretion. Such cases 
          will be reviewed individually and may require supporting evidence.
        </p>
      );
    case 4:
      return (
        <p>
          By completing your annual subscription payment, you acknowledge and agree to 
          this Refund Policy and understand that all payments made to WaliyyApp are 
          final unless otherwise determined by the platform’s administration.
        </p>
      );
    default:
      return null;
  }
};

export default RefundPolicy;
