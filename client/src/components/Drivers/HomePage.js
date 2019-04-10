import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DriverInactive from "./DriverInactive";
import DriverActiveNoRide from "./DriverActiveNoRide";
import DriverActiveOnRide from "./DriverActiveOnRide";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let relevantView;
    const activeRides = this.props.user.driverData.rides.filter(
      ride => ride.ride_status === "Driver en route"
    );
    const driverActive = this.props.user.driverData.active;

    if (!driverActive && !activeRides.length) {
      relevantView = (
        <DriverInactive
          user={this.props.user}
          usrUpdate={this.props.usrUpdate}
          refreshUserData={this.props.refreshUserData}
        />
      );
    } else if (activeRides.length > 0) {
      relevantView = (
        <DriverActiveOnRide
          user={this.props.user}
          currentRide={activeRides[0]}
        />
      );
    } else if (driverActive) {
      relevantView = (
        <DriverActiveNoRide
          user={this.props.user}
          usrUpdate={this.props.usrUpdate}
        />
      );
    }
    return <>{relevantView}</>;
  }
}
