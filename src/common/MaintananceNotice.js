import React from 'react';
import { FaTools, FaClock } from 'react-icons/fa';

const MaintenanceNotice = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <FaTools className="text-blue-600 text-3xl" />
        </div>
        
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Site Under Maintenance
        </h1>
        
        {/* Message */}
        <p className="text-gray-600 mb-6">
          We're performing scheduled maintenance to improve your experience. 
          Our site will be unavailable until:
        </p>
        
        {/* Date */}
        <div className="flex items-center justify-center bg-blue-50 rounded-lg py-3 mb-6">
          <FaClock className="text-blue-500 mr-2" />
          <span className="font-semibold text-blue-700">July 9, 2025</span>
        </div>
        
        {/* Additional Info */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 mb-3">
            We apologize for any inconvenience. Thank you for your patience.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default MaintenanceNotice;