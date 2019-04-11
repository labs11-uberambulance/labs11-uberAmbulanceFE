import React from 'react'
import Header from '../../components/LandingPage/Header/Header';
import CTA from '../../components/LandingPage/CTA/CTA'

import './LandingView.css';

const LandingView = () => {
  return (
    <div className="landing-container">
        <Header />
        <CTA/>
    </div>
  )
}

export default LandingView;
