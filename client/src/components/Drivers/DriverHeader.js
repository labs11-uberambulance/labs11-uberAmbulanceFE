import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import brLogo from "../../assests/images/birth_ride_logo_cycle.png";
import "./Header.css";
import DriverRideHistoryModal from "./DriverRideHistoryModal";
import DriverEditProfileModal from "./DriverEditProfileModal";

const header = props => {
  return (
    <header>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        // spacing={24}
        className="driver-header"
      >
        <Grid item xs={12} sm={4}>
          <NavLink to="/">
            <img
              src={brLogo}
              style={{ height: "4.5rem" }}
              alt="BirthRideHome"
            />
          </NavLink>
        </Grid>
        <Grid item xs={12} sm={8}>
          <nav>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={12} sm={4}>
                <DriverRideHistoryModal user={props.user} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DriverEditProfileModal />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  onClick={() => {
                    props.history.push("/logout");
                  }}
                  style={{
                    width: "100%",
                    color: "white",
                    // fontSize: "1rem",
                    background: `linear-gradient(
                      to right,
                      rgba(103, 58, 183, 0.6),
                      rgba(33, 150, 243, 0.6)
                    )`,
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Log Out
                </Button>
              </Grid>
            </Grid>
          </nav>
        </Grid>
      </Grid>
    </header>
  );
};

export default withRouter(header);
