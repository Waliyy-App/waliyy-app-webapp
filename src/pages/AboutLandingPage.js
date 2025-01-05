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

export default AboutLandingPage;
