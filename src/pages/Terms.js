import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="w-11/12 max-w-4xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 mb-4">
            Terms and Conditions
          </h1>
          
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 mb-16">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="mb-6 italic text-gray-600 dark:text-gray-300">
              WaliyyApp is dedicated to single Muslims of Nigerian heritage who are seriously searching for spouses in a halal and respectful manner. As such it is expected that subscribers fully engage on the platform.
            </p>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  1. Eligibility
                </h2>
                <p className="mb-4">
                  You must be at least 18 years old and legally permitted to marry under your local laws before signing up.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  2. Engagement Expectations
                </h2>
                <p className="mb-4">
                  WaliyyApp sincerely encourages young sisters to involve and follow sunnah and the guidance of their waliyy/mahram during the marriage process.
                </p>
                <p className="mb-4">
                  Non response to 'likes' (or direct emails) will result in your account being suspended or deleted as WaliyyApp will assume it is a dummy account AI or generated.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  3. Personal Information
                </h2>
                <p className="mb-4">
                  Personal information such as names, email addresses and telephone numbers are not permitted on the platform. Failure to comply will lead to WaliyyApp taking action.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  4. User Responsibilities
                </h2>
                <p className="mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Be truthful in all information provided</li>
                  <li>Use the platform solely for the purpose of seeking marriage</li>
                  <li>Treat others respectfully and without harassment</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  5. Content and Data Usage
                </h2>
                <p className="mb-4">
                  You are solely responsible for the information you provide on the platform and WaliyyApp reserves the right to use such material within the app and for marketing purposes. Your data will be handled diligently and no personal data will be sold to third parties.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  6. No Guarantees
                </h2>
                <p className="mb-4">
                  WaliyyApp does not guarantee you will find a match or get married through the app. The app only facilitates introductions, but success depends on your interactions.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  7. Limitation of Liability
                </h2>
                <p className="mb-4">
                  WaliyyApp is not liable for any emotional, financial, or personal losses resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Your use of the app</li>
                  <li>Misuse of any information by other users</li>
                  <li>Deception displayed by subscribers</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  8. Account Suspension/Termination
                </h2>
                <p className="mb-4">
                  WaliyyApp reserves the right to suspend or terminate your account if:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>You violate these terms and conditions</li>
                  <li>You provide misleading information</li>
                  <li>You harass other members</li>
                  <li>You use the app for non-marital or commercial purposes</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  9. Modifications
                </h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms and Conditions at any time. Continued use of the app constitutes acceptance of any changes.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-bold text-[#2D133A] dark:text-white mb-4 pb-2 border-b border-[#e9defe] dark:border-gray-700">
                  10. Governing Law
                </h2>
                <p className="mb-4">
                  These terms are governed by the laws of Nigeria.
                </p>
              </div>

              {/* Agreement */}
              <div className="mt-10 p-6 bg-[#f0e9ff] dark:bg-gray-700 rounded-xl">
                <h2 className="text-xl font-bold text-[#2D133A] dark:text-white mb-4">
                  Agreement
                </h2>
                <p className="text-[#2D133A] dark:text-gray-300">
                  By creating an account or using WaliyyApp, you agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Register */}
        <div className="text-center mb-10">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            Back to Registration
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;