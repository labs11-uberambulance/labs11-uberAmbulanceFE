import React from 'react'
import Header from '../../components/LandingPage/Header/Header';
import CTA from '../../components/LandingPage/CTA/CTA'
import HIW from '../../components/LandingPage/HIW/HowItWorks'
import Contact from '../../components/LandingPage/Contact/Contact'

import './LandingView.css';
import Testimonies from '../../components/LandingPage/Testimonies/Testimonies';

const LandingView = () => {
  return (
    <div className="landing-container">
        <Header />
        <CTA/>
        <HIW/>
        <Testimonies/>
        <Contact/>
    </div>
  )
}

export default LandingView;
