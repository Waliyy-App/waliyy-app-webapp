import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import FrequentlyAskedQuestions from '../components/landingPage/FAQ';
import Header from '../components/landingPage/Header';
import Footer from '../components/landingPage/Footer';
import Features from '../components/landingPage/Features';
import HowItWorks from '../components/landingPage/HowItWorks';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-12 bg-white dark:bg-white">
      <Navbar />
      <Header />
      <br />
      <br />
      <br />
      <Features />
      <HowItWorks />

      <div className="py-24 bg-[#2D133A]">
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">
            Emoji Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6">
            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <PersonSearchIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Explore</p>
                <p className="">
                  The Explore page allows users to browse through all profiles
                  available on WaliyyApp.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <AutoAwesomeIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Recommended</p>
                <p className="">
                  The Recommended page displays profiles that align closely with
                  the preferences you have set in WaliyyApp.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <HiOutlineAdjustmentsHorizontal className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Preferences</p>
                <p>
                  The Preferences page allows you to refine your search by
                  setting filters that help tailor your recommendations on
                  WaliyyApp.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <PersonIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Singles</p>
                <p className="">
                  You to add and manage up to four singles on WaliyyApp
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <ThumbUpIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Likes</p>
                <p className="">
                  The Likes page lets you keep track of interactions by
                  displaying profiles you have liked and those who have liked
                  you.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <FavoriteIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Match</p>
                <p className="">
                  The Match page is where you can see profiles that have
                  accepted your proposals, indicating mutual interest.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <AccountBoxIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Profile</p>
                <p className="">
                  The Profile page allows you to see how your profile appears to
                  other users on WaliyyApp.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-8">
              <div className="text-[#2d133a] flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 bg-[#2d133a] text-white rounded-full">
                  <SettingsIcon className="text-white text-xl" />
                </div>
                <p className="text-xl font-bold">Settings</p>
                <p className="">
                  The Settings page is where you can manage and update your
                  account and profile details on WaliyyApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FrequentlyAskedQuestions />
      <Footer />

      <div className="flex justify-between items-center mt-8 text-[#2D133A] bg-white dark:bg-white px-12">
        <p className="">
          Get In Touch with us:
          <a href="mailto:waliyyapp@gmail.com"> waliyyapp@gmail.com</a>
        </p>
        <p className="">{`© ${currentYear} WaliyyApp. All rights reserved.`}</p>
      </div>
    </div>
  );
};

export default LandingPage;
