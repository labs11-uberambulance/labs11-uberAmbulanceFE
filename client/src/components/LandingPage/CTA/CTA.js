import React from 'react'
import CTACard from './CTA-Card.js'
import homeImg from '../../../assests/images/home_img.png'
import Apple from '../../../assests/images/apple_store.svg'
import Android from '../../../assests/images/google-play-badge.png'

import './CTA.css'

export default function CTA() {
  return (
    <>
    <header className="CTA flex ">
      <div className="w-50  flex flex-col center-content CTA-Text">
          <h1 className="header-font">Helping mothers deliver their children Safely, Securely, &amp; Quickly.</h1>
          <div className="app-buttons">
            <a href="https://www.apple.com/ios/app-store"><img src={Apple} alt=""/></a>
            <a href="https://play.google.com/apps/testing/com.jbseppanen.birthride"><img src={Android} alt=""/></a>
          </div>
      </div>
      <div className="w-50 flex center-content devices-container">
          <img className="devices-img"src={homeImg} alt="Birthride landing page on three devices."/>
      </div>
    </header>
    <div className="flex w-100 center-content absolute-cards">
      <CTACard mother={'mother'}></CTACard>
      <CTACard driver={'driver'}></CTACard>
    </div>
    </>
  )
}


