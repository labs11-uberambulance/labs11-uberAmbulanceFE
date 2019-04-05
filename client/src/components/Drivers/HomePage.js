import React, { Component } from "react";
import DriverProfileMenu from "./DriverProfileMenu";
import { Button } from "@material-ui/core";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nothing: ""
    };
  }

  handleStatusClick = () => {
    this.props.usrUpdate(this.props.user, {
      driver: { active: !this.props.user.driverData.active }
    });
  };

  render() {
    const rides = this.props.user.driverData.rides.map(ride => {
      const status_color = ride.ride_status === "complete" ? "green" : "red";
      return (
        <div>
          <h4> Ride: </h4>
          <p>Mother {ride.mother_id}</p>
          <p>From {ride.start}</p>
          <p>To {ride.destination}</p>
          <p style={{ color: status_color }}>Status: {ride.ride_status}</p>
        </div>
      );
    });
    return (
      <div>
        <DriverProfileMenu />
        <Button
          color={this.props.user.driverData.active ? "secondary" : "primary"}
          variant="contained"
          onClick={this.handleStatusClick}
        >
          {this.props.user.driverData.active ? "Set Inactive" : "Set Active"}
        </Button>
        <p>Driver View</p>
        Welcome, {this.props.user.name}
        {rides}
      </div>
    );
  }
}
