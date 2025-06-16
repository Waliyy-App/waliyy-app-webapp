import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';

// CategoryCard Reusable component from "common"
import CategoryCard from '../common/CategoryCard';

import { FaPenAlt, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-white to-[#f8f9fa] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 mb-4">
            Islamic Marriage Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights and guidance for your marital journey
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-16 text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <FaBookOpen className="text-white text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Content Coming Soon!
            </h2>
            <p className="text-indigo-100 text-lg mb-6">
              We're preparing valuable content on Islamic marriage, relationships, 
              and personal development. Check back soon for insightful articles.
            </p>
            <div className="bg-white/20 rounded-full py-2 px-6 inline-flex items-center">
              <FaCalendarAlt className="text-white mr-2" />
              <span className="text-white font-medium">Launching Summer 2025</span>
            </div>
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <CategoryCard 
            icon={FaPenAlt}
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
            title="Marriage Guidance"
            description="Islamic perspectives on building successful marriages"
            badgeText="Coming Soon"
            badgeColor="text-purple-600 dark:text-purple-300"
            badgeBgColor="bg-purple-50 dark:bg-gray-700"
          />

          <CategoryCard 
            icon={FaBookOpen}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
            title="Relationship Advice"
            description="Practical tips for maintaining healthy relationships"
            badgeText="Coming Soon"
            badgeColor="text-blue-600 dark:text-blue-300"
            badgeBgColor="bg-blue-50 dark:bg-gray-700"
          />

          <CategoryCard 
            icon={FaPenAlt}
            iconBgColor="bg-pink-100 dark:bg-pink-900/30"
            iconColor="text-pink-600 dark:text-pink-400"
            title="Personal Development"
            description="Growing as a Muslim individual and partner"
            badgeText="Coming Soon"
            badgeColor="text-pink-600 dark:text-pink-300"
            badgeBgColor="bg-pink-50 dark:bg-gray-700"
          />
        </div>

  

        {/* Call to Action */}
        <div className="text-center rounded-2xl p-8 mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl">
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

export default BlogPage;
