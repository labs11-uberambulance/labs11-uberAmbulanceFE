import React from 'react'
import Carousel from './Carousel';

const headerText ={
    margin: "100px auto 50px",
    fontSize: "2rem"
}
export default function Testimonies() {
  return (
    <section>
      <h3 style={headerText}>How we're changing lives</h3>
        <Carousel/>
    </section>
  )
}
