import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Section from '../components/landingPage/Section';
import FrequentlyAskedQuestions from '../components/landingPage/FAQ';
import Header from '../components/landingPage/Header';
import Footer from '../components/landingPage/Footer';
import Features from '../components/landingPage/Features';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-12 bg-white dark:bg-white">
      <Navbar />
      <Header />
      <Section />
      <Features />
      <FrequentlyAskedQuestions />
      <Footer />
      <p className='text-[#2D133A] text-center mt-8'>{`© ${currentYear} WaliyyApp. All rights reserved.`}</p>
    </div>
  );
};

export default LandingPage;
