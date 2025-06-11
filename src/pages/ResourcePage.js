import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import FemaleIcon from '../assets/illustrations/muslim_lady_founder.svg';
import MaleIcon from '../assets/illustrations/muslim_founder.svg';
import { FaYoutube, FaBookOpen, FaLaptopCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResourcePage = () => {   
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fa] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div>jdlk</div>
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 mb-4">
            Resources Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get inspired with our collection of resources
          </p>
        </div>

        {/* Founder's Bio */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="md:w-1/4 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-indigo-200 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img 
                src={MaleIcon} 
                alt="Sponsor" 
                className="w-full h-full border-2 border-dashed rounded-full" 
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Meet Our Sponsor
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Olanlege Adebayo AbdulFattah is an engineer with over 25 years
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
              in the US and the UK.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 flex flex-col md:flex-row-reverse items-center gap-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="md:w-1/4 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-100 to-rose-200 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img 
                src={FemaleIcon} 
                alt="Sponsor" 
                className="w-full h-full border-2 border-dashed rounded-full" 
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Meet Our Sponsor
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Rasheedah Raji is a retired teacher. She spends her time
              volunteering for community projects which empower the youth and
              ladies. With a degree in Social Policy and decades of experience
              acquired from supporting young people, she has good understanding
              of the importance of family relationships and bonds; and the need
              for youngsters to get married in order to protect themselves
              according to Islamic principles. WaliyyApp was borne out of
              concern of the challenges currently facing Muslim youth all over
              the world, and in particular those of Nigerian descent who wish to
              marry fellow Nigerians but struggle to achieve their desire.
            </p>
          </div>
        </div>

        {/* Three Column Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* YouTube Column */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-3">
                  <FaYoutube className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Video Content</h3>
              </div>
              <div className="aspect-video mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaYoutube className="text-white text-6xl opacity-80" />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Watch our latest tutorials, interviews, and discussions on YouTube.
              </p>
              <a
                href="https://www.youtube.com/@Waliyy_app_com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                <FaYoutube className="mr-2" />
                Visit Our Channel
              </a>
            </div>
          </div>

          {/* Tutorials Column */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaLaptopCode className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tutorials</h3>
              </div>
              <div className="space-y-4 mb-4 flex-grow">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">WaliyyApp Walkthrough</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Learn how to navigate and use WaliyyApp effectively.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium group"
                  >
                    Watch Now
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md">
                  View All Tutorials
                </button>
              </div>
            </div>
          </div>

          {/* Blog Column */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaBookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Blog & Articles</h3>
              </div>
              <div className="aspect-video mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <FaBookOpen className="text-white text-5xl opacity-80" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Explore our collection of articles on Islamic marriage, relationships, and personal development.
              </p>
              <button className="mt-auto py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md">
                Read Articles
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center rounded-2xl p-8 mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Other Half the Halal Way?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join a vibrant Muslim community committed to sincere, faith-driven
            relationships. Find your match with confidence, privacy, and support
            along the way.
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-700 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
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