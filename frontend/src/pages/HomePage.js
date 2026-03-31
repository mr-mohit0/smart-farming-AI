import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import ContactUs from '../components/ContactUs';
import Feedback from '../components/Feedback';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <CoreValues />
      <ContactUs />
      <Feedback />
      <Footer />
    </div>
  );
};

export default HomePage;