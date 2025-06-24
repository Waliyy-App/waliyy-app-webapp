import React from 'react';
import About from '../components/landingPage/About';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';

const AboutLandingPage = () => {
  return (
    <div className="pt-12">
      <Navbar />
      <About />

      <Footer />
    </div>
  );
};

export default AboutLandingPage;
