import React from "react";
import Paper from "@material-ui/core/Paper";
import Step_1 from "./images/step_1.svg";
import Step_2 from "./images/step_2.svg";
import Step_3 from "./images/step_3.svg";
import Step_4 from "./images/step_4.svg";
import Step_5 from "./images/step_5.svg";
import Step_6 from "./images/step_6.svg";
import AOS from "aos";


import "./HowitWorks.css";
const headerText = {
  margin: "150px auto 0",
  fontSize: "2rem"
};
export default function HowItWorks() {
  AOS.init();
  return (
    <div>
      <h3 style={headerText}>How Does it Work?</h3>
      <div className="flex flex-wrap w-85 mx-auto my-4">
        <div
          data-aos="fade-right"
          data-aos-delay="90"
          className="w-50 hwi-text p-4"
        >
          <h4>Register</h4>
          <p>
            Visit you local health center and register for an account. Preload
            your contact information, preferred hospital and route to make
            delivery day a breeze.
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="90"
          className="w-50 flex  br-4 icon-card"
        >
          <div className="w-15 flex center-content bg-primary">1</div>
          <img className="mx-auto step-icon" src={Step_1} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap w-85 mx-auto my-4 flex-row-rev">
        <div
          className="w-50 hwi-text p-4"
          data-aos="fade-left"
          data-aos-delay="90"
        >
          <h4>Wait for your Due Date</h4>
          <p>
            While we wait for your new ball of joy to enter this world take
            sometime to relax knowing Birthride has got you covered.{" "}
          </p>
        </div>
        <div
          className="w-50 flex  br-4 icon-card"
          data-aos="fade-right"
          data-aos-delay="90"
        >
          <div className="w-15 flex center-content bg-secondary">2</div>
          <img className="mx-auto step-icon" src={Step_2} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap w-85 mx-auto my-4">
        <div
          className="w-50 hwi-text p-4"
          data-aos="fade-right"
          data-aos-delay="90"
        >
          <h4>It's Baby Time!</h4>
          <p>
            It's Coming! It's Coming! What do we do?? Don't fret! Hop on
            Birthride's mobile application or web app to request a ride.{" "}
          </p>
        </div>
        <div
          className="w-50 flex br-4 icon-card"
          data-aos="fade-left"
          data-aos-delay="90"
        >
          <div className="w-15 flex center-content bg-primary">3</div>
          <img className="mx-auto step-icon" src={Step_3} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap w-85 mx-auto my-4 flex-row-rev">
        <div
          className="w-50 hwi-text p-4"
          data-aos="fade-left"
          data-aos-delay="90"
        >
          <h4>Select a Driver and Help Will Arrive Soon</h4>
          <p>
            After selecting a driver, they will be notified of your need. If
            they're unavailable our app will find the next closest driver to
            help you! Stay close to your telephone as you'll be receiving text
            notifications throughout the process.
          </p>
        </div>
        <div
          className="w-50 flex br-4 icon-card"
          data-aos="fade-right"
          data-aos-delay="90"
        >
          <div className="w-15 flex center-content bg-secondary">4</div>
          <img className="mx-auto step-icon" src={Step_4} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap w-85 mx-auto my-4">
        <div
          className="w-50 hwi-text p-4"
          data-aos="fade-right"
          data-aos-delay="90"
        >
          <h4>Safely Transport You to the Hospital</h4>
          <p>
            Our drivers will transport you directly to your predetermined
            hospital or health center. This will be done at a pre-agreed price
            that you'll be able to see and confirm throughout your journey..
          </p>
        </div>
        <div
          className="w-50 flex br-4 icon-card"
          data-aos="fade-left"
          data-aos-delay="90"
        >
          <div className="w-15 flex center-content bg-primary">5</div>
          <img className="mx-auto step-icon" src={Step_6} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap w-85 mx-auto my-4 flex-row-rev">
        <div
          className="w-50 hwi-text p-4"
          data-aos="fade-left"
          data-aos-delay="90"
        >
          <h4>Let's have a Baby!</h4>
          <p>
            Once you're dropped of all you need to do is focus on one of the
            most fulfilling moments of your life!
          </p>
        </div>
        <div
          className="w-50 flex br-4 icon-card"
          data-aos="fade-right"
          data-aos-delay="90"
        >
          <div className="w-15 flex center-content bg-secondary">6</div>
          <img className="mx-auto step-icon" src={Step_5} alt="" />
        </div>
      </div>
    </div>
  );
}
