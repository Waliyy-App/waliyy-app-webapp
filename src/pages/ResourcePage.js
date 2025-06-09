import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import FemaleIcon from '../assets/illustrations/muslim_lady_founder.svg';
import MaleIcon from '../assets/illustrations/muslim_founder.svg';
import { FaYoutube, FaBookOpen, FaLaptopCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ResourcePage = () => {
  return (
    <div className="pt-12 bg-white dark:bg-white">
      <Navbar />

      <div className="w-4/5 mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resources Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired with our collection of resources
          </p>
        </div>

        {/* Founder's Bio */}
        <div className="bg-[#f8f9fa] rounded-xl p-8 mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
              {/* Replace with actual founder image */}
              <div className="w-full h-full">
                <img src={MaleIcon} alt="user icon" className="" />
              </div>
            </div>
          </div>
          <div className="md:w-3/4 md:pl-8">
            <h2 className="text-2xl font-bold mb-4">Meet Our Sponsor</h2>
            <p className="text-gray-700 mb-4">
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

        <div className="bg-[#f8f9fa] rounded-xl p-8 mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-3/4 md:pl-8">
            <h2 className="text-2xl font-bold mb-4">Meet Our Sponsor</h2>
            <p className="text-gray-700 mb-4">
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
          <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
              {/* Replace with actual founder image */}
              <div className="bg-gray-400 w-full h-full">
                <img src={FemaleIcon} alt="user icon" className="" />
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Blog Column */}

          {/* YouTube Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaYoutube className="text-red-600 mr-3" size={24} />
                <h3 className="text-xl font-bold">Video Content</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md overflow-hidden">
                {/* YouTube embed placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  YouTube Video Thumbnail
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Watch our latest tutorials, interviews, and discussions on
                YouTube.
              </p>
              <a
                href="https://www.youtube.com/@Waliyy_app_com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <FaYoutube className="mr-2" />
                Visit Our Channel
              </a>
            </div>
          </div>

          {/* Tutorials Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-green-600 mr-3" size={24} />
                <h3 className="text-xl font-bold">Tutorials</h3>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">WaliyyApp Walkthrough</h4>
                  <p className="text-gray-600 mb-2">
                    Learn how to navigate and use WaliyyApp effectively.
                  </p>
                  <a
                    href="#"
                    className="text-green-600 hover:underline text-sm"
                  >
                    Watch Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Find Your Other Half the Halal Way?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join a vibrant Muslim community committed to sincere, faith-driven
            relationships. Find your match with confidence, privacy, and support
            along the way.
          </p>
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-full md:w-[160px] mx-auto rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium transition-all duration-300"
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
