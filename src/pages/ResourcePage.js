import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { FaYoutube, FaBookOpen, FaLaptop } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ResourceColumn from '../common/ResourceColumn';

const ResourcePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa]">
      <Navbar />
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D133A] mb-4">
            Resource Center
          </h1>
          <p className="text-xl">Get inspired by our collection of resources</p>
        </div>

        {/* Three Column Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24">
          {/* YouTube Column */}
          <ResourceColumn
            Icon={FaYoutube}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
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
            <p className="text-gray-100 mb-4 flex-grow">
              Watch our latest tutorials, interviews, and discussions on
              YouTube.
            </p>
          </ResourceColumn>

          {/* Tutorials Column */}
          <ResourceColumn
            Icon={FaLaptop}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            title="Tutorials"
            button={
              <a
                href="https://drive.google.com/file/d/1Q0mIxhwgNw5BmpEF9vxBa_guoexn8FFQ/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
                className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md mt-auto"
              >
                Watch Now
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            }
          >
            <div className="aspect-video mb-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
              <FaLaptop className="text-white text-5xl opacity-80" />
            </div>
            <p className="text-gray-100 mb-2">
              Learn how to navigate and use WaliyyApp effectively.
            </p>
          </ResourceColumn>

          {/* Blog Column */}
          <ResourceColumn
            Icon={FaBookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
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
            <p className="text-gray-100 mb-4">
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
            className="flex items-center justify-center w-auto sm:w-[340px] mx-auto rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-profile transition-all duration-300"
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
