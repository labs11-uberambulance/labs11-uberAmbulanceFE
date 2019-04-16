import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import brLogo from "../../assests/images/birth_ride_logo_cycle.png";
import "./Header.css";

const header = props => {
  return (
    <header className="landing-header">
      <NavLink to="/">
        <img src={brLogo} alt="BirthRideHome" />
      </NavLink>
      <nav>
        <ul>
          <li>
            <button
              onClick={() => {
                props.history.push("/logout");
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(header);
