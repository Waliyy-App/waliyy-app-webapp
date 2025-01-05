import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import FrequentlyAskedQuestions from '../components/landingPage/FAQ';
import Header from '../components/landingPage/Header';
import Footer from '../components/landingPage/Footer';
import Features from '../components/landingPage/Features';
import HowItWorks from '../components/landingPage/HowItWorks';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-12 bg-white dark:bg-white">
      <Navbar />
      <Header />
      <HowItWorks />
      <Features />
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
