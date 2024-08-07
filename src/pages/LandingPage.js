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
      <p className="text-[#2D133A] bg-white dark:bg-white text-center mt-8">{`© ${currentYear} WaliyyApp. All rights reserved.`}</p>
    </div>
  );
};

export default LandingPage;
