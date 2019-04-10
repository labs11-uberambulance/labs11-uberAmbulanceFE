import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DriverProfileMenu from "./DriverProfileMenu";
import DriverHUD from "./DriverHUD";
import DriverActiveRides from "./DriverActiveRides";
import DriverUpdateLocation from "./DriverUpdateLocation";
import RouteMap from "../../components/GoogleMaps/RouteMap/RouteMap";
import DriverInactive from "./DriverInactive";
import DriverActiveNoRide from "./DriverActiveNoRide";
import DriverActiveOnRide from "./DriverActiveOnRide";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleUpdateDriverLoc = driverLatLng => {
  //   console.log("update driver loc to: ", driverLatLng);
  //   // {"latlng":"0.9445402714964785,33.08937988281251"}
  //   this.props.usrUpdate(this.props.user, {
  //     user: {
  //       location: {
  //         latlng: `${driverLatLng}`
  //       }
  //     }
  //   });
  // };

  render() {
    // const driverLocArr = this.props.user.location.latlng.split(",");
    // const driverLat = parseFloat(driverLocArr[0]);
    // const driverLng = parseFloat(driverLocArr[1]);

    // const currentRide = this.props.user.driverData.rides.filter(
    //   ride => ride.ride_status === "Driver en route"
    // );
    // let relevantMap = (
    //   <DriverUpdateLocation
    //     latInit={driverLat}
    //     lngInit={driverLng}
    //     storeLatLng={driverLatLng => this.handleUpdateDriverLoc(driverLatLng)}
    //   />
    // );
    // if (currentRide.length) {
    //   relevantMap = (
    //     <RouteMap
    //       start={this.props.user.location.latlng}
    //       stop={currentRide[0].start}
    //     />
    //   );
    // }
    let relevantView = (
      <DriverInactive user={this.props.user} usrUpdate={this.props.usrUpdate} />
    );
    const activeRides = this.props.user.driverData.rides.filter(
      ride => ride.ride_status === "Driver en route"
    );
    const rideRequests = this.props.user.driverData.rides.filter(
      ride => ride.ride_status === "waiting_on_driver"
    );
    if (activeRides.length > 0) {
      relevantView = (
        <DriverActiveOnRide
          user={this.props.user}
          currentRide={activeRides[0]}
        />
      );
    } else if (rideRequests.length > 0) {
      relevantView = (
        <DriverActiveNoRide
          user={this.props.user}
          usrUpdate={this.props.usrUpdate}
        />
      );
    }
    return (
      <>
        {relevantView}
        {/* <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <DriverProfileMenu
            user={this.props.user}
            profileImg={this.props.user.driverData.photo_url}
          />
          <DriverHUD user={this.props.user} usrUpdate={this.props.usrUpdate} />
          <DriverActiveRides
            user={this.props.user}
            usrUpdate={this.props.usrUpdate}
            refreshUserData={this.props.refreshUserData}
          />
        </Grid>
        {relevantMap} */}
      </>
    );
  }
}
