import React from 'react';
import HeroSection from '../components/HeroSection';
import Statistics from '../components/Statistics';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import BriefAbout from '../components/BriefAbout';
import ContactUs from '../components/ContactUs';
import Feedback from '../components/Feedback';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Statistics />
      <About />
      <CoreValues />
      <BriefAbout />
      <ContactUs />
      <Feedback />
      <Footer />
    </div>
  );
};

export default HomePage;