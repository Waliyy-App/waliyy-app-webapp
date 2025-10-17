// import React from 'react';
// import Logo from '../../assets/logo/Untitled-1-01.jpg';
// import { Link, NavLink} from 'react-router-dom';

// const Footer = () => {
//   return (
//     <div className="mt-16 bg-[#2D133A] p-5 flex items-center justify-evenly flex-wrap gap-6">
//       <NavLink to="/">
//         <img src={Logo} alt="logo" className="w-20" />
//       </NavLink>

//       <NavLink
//         to="/"
//         className="text-white text-lg font-semibold transition-all duration-500"
//       >
//         Home
//       </NavLink>
//       <NavLink
//         to="/about"
//         className="text-white text-lg font-semibold transition-all duration-500"
//       >
//         About
//       </NavLink>
//       <NavLink
//         to="/resources"
//         className="text-white text-lg font-semibold transition-all duration-500"
//       >
//         Resources
//       </NavLink>
//       <Link
//         to="/login"
//         className="flex items-center justify-center w-[120px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-white font-medium box-shadow-style transition-all duration-300"
//       >
//         Sign In
//       </Link>

//       <Link
//         to="/sign-up"
//         className="flex items-center justify-center w-[120px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium box-shadow-style transition-all duration-300"
//       >
//         Sign Up
//       </Link>
//     </div>
//   );
// };

// export default Footer;

import React from 'react';
import Logo from '../../assets/logo/Untitled-1-01.jpg';
import { Link, NavLink } from 'react-router-dom';
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2D133A] text-white mt-16 px-6 sm:px-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content - Flex container */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Logo and Contact Info */}
          <div className="mb-6 md:mb-0">
            <NavLink to="/" className="flex items-center mb-4">
              <img src={Logo} alt="logo" className="w-20" />
            </NavLink>
            <p className="text-gray-300 mb-4">
              Embark on a journey of love, faith and connection.
            </p>

            <div className="flex items-center mb-4 text-gray-300 hover:text-white transition-colors">
              <FaEnvelope className="mr-2" />
              <a href="mailto:admin@waliyyapp.com">admin@waliyyapp.com</a>
            </div>
            <div className="flex items-center mb-4 text-gray-300 hover:text-white transition-colors">
              <FaEnvelope className="mr-2" />
              <a href="mailto:waliyyapp@gmail.com">waliyyapp@gmail.com</a>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/people/Waliyy-App/61558344552005/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/waliyy_app?igsh=MW9kZDYycTJ5eng5bA%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@waliyy.app?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/resources"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Resources
                </NavLink>
              </li>
               <li>
                <NavLink
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of service
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <div>
              <Link
                to="/login"
                className="flex items-center justify-center mb-4 w-full md:w-[160px] rounded-3xl h-12 border border-[#BA9FFE] hover:bg-[#BA9FFE] text-white font-medium transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="flex items-center justify-center w-full md:w-[160px] rounded-3xl h-12 bg-[#BA9FFE] text-white hover:bg-[#a37eff] font-medium transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 mb-6 border-t border-[#3E1D4D] pt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} WaliyyApp. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <NavLink
              to="/terms"
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;