import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Section from '../components/landingPage/Section';
import FrequentlyAskedQuestions from '../components/landingPage/FAQ';
import Header from '../components/landingPage/Header';

const LandingPage = () => {
  return (
    <div className="py-12 ">
      <Navbar />
      <Header />
      <Section />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default LandingPage;
