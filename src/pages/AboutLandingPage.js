import React from 'react';
import About from '../components/landingPage/About';
import Navbar from '../components/landingPage/Navbar';

const AboutLandingPage = () => {
  return (
    <div className='py-12'>
      <Navbar />
      <About />
      <div></div>
    </div>
  );
};

export default AboutLandingPage;
