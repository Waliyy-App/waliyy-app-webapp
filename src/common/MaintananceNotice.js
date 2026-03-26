import React from 'react';
import { FaTools, FaClock } from 'react-icons/fa';

const MaintenanceNotice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center border border-purple-100 transform transition-all hover:scale-[1.02]">
        {/* Animated Icon Container */}
        <div className="mx-auto bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-purple-200/50">
          <FaTools className="text-purple-600 text-4xl animate-bounce" />
        </div>
        
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          System Update
        </h1>
        
        {/* User Requested Message */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
          <p className="text-lg text-gray-700 font-medium leading-relaxed">
            The website is under <span className="text-purple-600 font-bold">maintenance</span>. <br/>
            Kindly check back <span className="text-purple-600 font-bold">very soon</span>.
          </p>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-3 bg-purple-50 rounded-lg py-3 mb-8">
          <FaClock className="text-purple-500 text-lg" />
          <span className="font-bold text-purple-700 uppercase tracking-widest text-xs">Improving your experience</span>
        </div>
        
        {/* Apology */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            We apologize for any inconvenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceNotice;