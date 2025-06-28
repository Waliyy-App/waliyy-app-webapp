import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import FemaleIcon from '../assets/illustrations/muslim_lady_founder.svg';
import MaleIcon from '../assets/illustrations/muslim_founder.svg';
import { FaYoutube, FaBookOpen, FaLaptopCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Reusable components from "common"
import FounderBio from '../common/FounderBio';
import ResourceColumn from '../common/ResourceColumn';

const ResourcePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa]">
      <Navbar />
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D133A] mb-4">
            Resources Center
          </h1>
          <p className="text-xl">
            Get inspired with our collection of resources
          </p>
        </div>

        {/* Founder Bios */}
        <FounderBio
          imageSrc={MaleIcon}
          title="Meet Our Sponsor"
          bio="Olanlege Adebayo AbdulFattah is an engineer with over 25 years
          experience in manufacturing, construction and Oil and Gas sector
          at the technical and management levels. He graduated from the
          prestigious Obafemi Awolowo University, Ile Ife from the
          department of Chemical Engineering. While in OAU, he held several
          executive positions at the branch and Area Unit levels of MSSN and
          was also MCAN coordinator at Ikot Abasi, Akwa Ibom State where he
          served. He also served at various executive levels in UNIFEMGA
          (University of Ife Muslim Graduates Association) where he is the
          immediate past Global President. He is happily married with
          children and passionate about Youth issues. He is from Ijebu Ode
          in Ogun State, based mainly in Ibadan, Nigeria but has family also
          in the US and the UK."
          imageOnLeft={true}
          gradientFrom="from-purple-700"
          gradientTo="to-indigo-500"
        />

        <FounderBio
          imageSrc={FemaleIcon}
          title="Meet Our Sponsor"
          bio="Rasheedah Raji is a retired teacher. She spends her time
          volunteering for community projects which empower the youth and
          ladies. With a degree in Social Policy and decades of experience
          acquired from supporting young people, she has good understanding
          of the importance of family relationships and bonds; and the need
          for youngsters to get married in order to protect themselves
          according to Islamic principles. WaliyyApp was borne out of
          concern of the challenges currently facing Muslim youth all over
          the world, and in particular those of Nigerian descent who wish to
          marry fellow Nigerians but struggle to achieve their desire."
          imageOnLeft={false}
          gradientFrom="from-pink-700"
          gradientTo="to-rose-500"
        />

        {/* Three Column Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24">
          {/* YouTube Column */}
          <ResourceColumn
            Icon={FaYoutube}
            iconBgColor="bg-red-100 dark:bg-red-900/30"
            iconColor="text-red-600 dark:text-red-400"
            title="Video Content"
            button={
              <a
                href="https://www.youtube.com/@Waliyy_app_com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                <FaYoutube className="mr-2" />
                Visit Our Channel
              </a>
            }
          >
            <div className="aspect-video mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaYoutube className="text-white text-6xl opacity-80" />
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
              Watch our latest tutorials, interviews, and discussions on
              YouTube.
            </p>
          </ResourceColumn>

          {/* Tutorials Column */}
          <ResourceColumn
            Icon={FaLaptopCode}
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
            title="Tutorials"
            button={
              <button
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
                disabled
              >
                View All Tutorials
              </button>
            }
          >
            <div className="space-y-4 mb-4 flex-grow">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
                  WaliyyApp Walkthrough
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Learn how to navigate and use WaliyyApp effectively.
                </p>
                <a
                  href="https://drive.google.com/file/d/1Q0mIxhwgNw5BmpEF9vxBa_guoexn8FFQ/view?usp=sharing"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium group"
                >
                  Watch Now
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </div>
          </ResourceColumn>

          {/* Blog Column */}
          <ResourceColumn
            Icon={FaBookOpen}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
            title="Blog & Articles"
            button={
              <Link
                to="/blog"
                className="mt-auto py-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md flex justify-center items-center"
              >
                Read Articles
              </Link>
            }
          >
            <div className="aspect-video mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <FaBookOpen className="text-white text-5xl opacity-80" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Explore our collection of articles on Islamic marriage,
              relationships, and personal development.
            </p>
          </ResourceColumn>
        </div>

        {/* Call to Action */}
        <div className="text-center rounded-2xl p-8 mb-12 hero-section shadow-xl animate-fadeIn text-[#2D133A]">
          <h2 className="text-capitalize font-bold text-2xl sm:text-3xl text-center mb-4">
            Ready to Find Your Other Half the Halal Way?
          </h2>
          <p className="text-center text-lg font-medium mb-6">
            Join a vibrant Muslim community committed to sincere, faith-driven
            relationships. Find your match with confidence, privacy, and support
            along the way.
          </p>
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-[340px] mx-auto rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResourcePage;
