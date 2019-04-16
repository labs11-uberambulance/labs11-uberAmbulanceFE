import React, { Component } from "react";
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
      ride =>
        ride.ride_status !== "waiting_on_driver" &&
        ride.ride_status !== "complete"
    );
    const driverActive = this.props.user.driverData.active;

    if (!driverActive && !activeRides.length) {
      relevantView = (
        <DriverInactive
          user={this.props.user}
          usrUpdate={this.props.usrUpdate}
          refreshUserData={this.props.refreshUserData}
          usrLoading={this.props.usrLoading}
        />
      );
    } else if (activeRides.length > 0) {
      relevantView = (
        <DriverActiveOnRide
          user={this.props.user}
          currentRide={activeRides[0]}
          refreshUserData={this.props.refreshUserData}
          usrLoading={this.props.usrLoading}
        />
      );
    } else if (driverActive) {
      relevantView = (
        <DriverActiveNoRide
          user={this.props.user}
          usrUpdate={this.props.usrUpdate}
          refreshUserData={this.props.refreshUserData}
          usrLoading={this.props.usrLoading}
        />
      );
    }
    return <>{relevantView}</>;
  }
}
