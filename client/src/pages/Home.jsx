import React from 'react';
import Banner from '../components/home/Banner.jsx';
import Hero from '../components/home/Hero.jsx';
import Features from '../components/home/Features.jsx';
import Testimonial from '../components/home/Testimonial.jsx';
import CallToAction from '../components/home/CallToAction.jsx';
import Footer from '../components/home/Footer.jsx';

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
