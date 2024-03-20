import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Section from '../components/landingPage/Section';
import FrequentlyAskedQuestions from '../components/landingPage/FAQ';
import Header from '../components/landingPage/Header';
import Footer from '../components/landingPage/Footer';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-12 ">
      <Navbar />
      <Header />
      <Section />
      <FrequentlyAskedQuestions />
      <Footer />
      <p className='text-[#2D133A] text-center mt-8'>{`© ${currentYear} WaliyyApp. All rights reserved.`}</p>
    </div>
  );
};

export default LandingPage;
