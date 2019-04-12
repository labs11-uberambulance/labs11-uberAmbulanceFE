import React from 'react'
import CTACard from './CTA-Card.js'

import './CTA.css'

export default function CTA() {
  return (
    <>
    <header className="CTA center-contents flex flex-col">
      <div className="w-100 h-80 flex center-content">
          <h1 className="header-font">Helping mothers deliver their children Safely, Securely, & Quickly.</h1>
      </div>
    </header>
    <div className="flex w-100 center-content absolute-cards">
      <CTACard mother={'mother'}></CTACard>
      <CTACard driver={'driver'}></CTACard>
    </div>
    </>
  )
}


