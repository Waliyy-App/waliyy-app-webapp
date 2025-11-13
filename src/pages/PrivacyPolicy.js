import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { Link } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa]">
      <Navbar />

      <div className="w-11/12 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Last Updated: November 11, 2025
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-8">
              <p className="italic text-gray-700 m-0">
                Welcome to WaliyyApp. Your privacy is important to us, and we are committed to protecting your personal information in accordance with the Nigeria Data Protection Act (NDPA) 2023 and NDPR by NITDA.
              </p>
            </div>

            <div className="space-y-10">
              {sectionTitles.map((title, index) => (
                <div key={index} className="border-l-2 border-purple-100 pl-4 md:pl-6">
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-3">
                    {index + 1}. {title}
                  </h2>
                  <div className="text-gray-700">{sectionContent(index + 1)}</div>
                </div>
              ))}

              {/* Link to Terms of Service */}
              <div className="flex justify-center mt-10">
                <Link
                  to="/terms"
                  className="flex items-center gap-2 font-semibold text-indigo-700 hover:text-purple-700 transition-colors duration-200"
                >
                  <FiRefreshCcw className="text-2xl text-indigo-700" />
                  <span className="text-lg">View Terms of Service</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Registration */}
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
  'Introduction',
  'Data We Collect',
  'Purpose of Data Processing',
  'Legal Basis for Processing',
  'Data Sharing and Disclosure',
  'Data Storage and Retention',
  'Your Data Protection Rights',
  'Data Security',
  'Cross-Border Data Transfers',
  "Children's Privacy",
  'Changes to This Policy',
  'Contact Us',
];

// Section content
const sectionContent = (section) => {
  switch (section) {
    case 1:
      return (
        <p>
          WaliyyApp (“we,” “our,” “us”) values your privacy. This policy explains how we collect, use, store, and protect your personal data when you use our app, website, or related services (“WaliyyApp” or “the Platform”). By using WaliyyApp, you agree to this Privacy Policy.
        </p>
      );
    case 2:
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information: name, username, email address, password, and profile details.</li>
          <li>User content: we do not collect or access messages between matches.</li>
          <li>Contact information: when you reach out for support, feedback, or inquiries.</li>
        </ul>
      );
    case 3:
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>To create and manage your account</li>
          <li>To personalize your experience</li>
          <li>To improve our services</li>
          <li>To communicate updates or security alerts</li>
          <li>To comply with legal obligations</li>
          <li>To prevent fraud or abuse</li>
        </ul>
      );
    case 4:
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Consent: when you voluntarily provide information.</li>
          <li>Contractual necessity: to deliver requested services.</li>
          <li>Legal obligation: to comply with laws and regulations.</li>
          <li>Legitimate interest: to maintain and improve platform operations.</li>
        </ul>
      );
    case 5:
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not sell or rent your personal data.</li>
          <li>Data may be shared with service providers under strict confidentiality.</li>
          <li>Data may be shared with legal authorities if required by law.</li>
          <li>We share contact details with users only when a match occurs.</li>
        </ul>
      );
    case 6:
      return (
        <p>
          Your data is securely stored using encryption and access controls. It is retained only as long as necessary or required by law, after which it is securely deleted or anonymized.
        </p>
      );
    case 7:
      return (
        <>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Withdraw consent</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at <a href="mailto:waliyyapp@gmail.com" className="text-indigo-600 underline">waliyyapp@gmail.com</a> or <a href="mailto:admin@waliyyapp.com" className="text-indigo-600 underline">admin@waliyyapp.com</a>.
          </p>
        </>
      );
    case 8:
      return (
        <p>
          We use physical, technical, and administrative safeguards to protect your personal data from unauthorized access, loss, or misuse. However, no system is completely secure.
        </p>
      );
    case 9:
      return (
        <p>
          Data may be shared with users outside Nigeria when you match with them. Such transfers comply with the NDPA and include adequate safeguards or user consent.
        </p>
      );
    case 10:
      return (
        <p>
          WaliyyApp is not intended for users under 18 years of age. We do not knowingly collect data from minors.
        </p>
      );
    case 11:
      return (
        <p>
          We may update this Privacy Policy periodically. Updates will be posted here with a new “Last Updated” date. Continued use of WaliyyApp means you accept the revised terms.
        </p>
      );
    case 12:
      return (
        <p>
          If you have questions or complaints, contact us at <a href="mailto:admin@waliyyapp.com" className="text-indigo-600 underline">admin@waliyyapp.com</a> or <a href="mailto:waliyyapp@gmail.com" className="text-indigo-600 underline">waliyyapp@gmail.com</a>.  
          <br />📍 WaliyyApp Counseling, Ibadan, Nigeria.  
          <br />You may also contact the Nigeria Data Protection Commission (NDPC) for concerns.
        </p>
      );
    default:
      return null;
  }
};

export default PrivacyPolicy;
