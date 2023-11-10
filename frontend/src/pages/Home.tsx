import React from 'react'

import Categories from '../components/Home Page/Categories';
import HeroSection from '../components/Home Page/HeroSection';
import ServiceSection from '../components/Home Page/ServiceSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServiceSection />
      {/* <Categories /> */}
    </div>
  )
}

export default Home;