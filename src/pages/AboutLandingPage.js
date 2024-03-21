import React from 'react';
import About from '../components/landingPage/About';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';

const AboutLandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-12">
      <Navbar />
      <About />
      <Footer />
      <p className="text-[#2D133A] text-center mt-8">{`© ${currentYear} WaliyyApp. All rights reserved.`}</p>
    </div>
  );
};

export default AboutLandingPage;
