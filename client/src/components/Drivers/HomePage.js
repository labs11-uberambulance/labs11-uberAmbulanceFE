import React, { Component } from "react";
import DriverProfileMenu from "./DriverProfileMenu";
import { Button } from "@material-ui/core";
import DriverUpdateLocation from "./DriverUpdateLocation";

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

  handleUpdateDriverLoc = driverLatLng => {
    console.log("update driver loc to: ", driverLatLng);
    // {"latlng":"0.9445402714964785,33.08937988281251"}
    this.props.usrUpdate(this.props.user, {
      user: {
        location: {
          latlng: `${driverLatLng}`
        }
      }
    });
  };

  render() {
    const driverLocArr = this.props.user.location.latlng.split(",");
    const driverLat = parseFloat(driverLocArr[0]);
    const driverLng = parseFloat(driverLocArr[1]);
    return (
      <div>
        <DriverProfileMenu
          user={this.props.user}
          profileImg={this.props.user.driverData.photo_url}
        />
        <Button
          color={this.props.user.driverData.active ? "secondary" : "primary"}
          variant="contained"
          onClick={this.handleStatusClick}
        >
          {this.props.user.driverData.active ? "Set Inactive" : "Set Active"}
        </Button>
        <p>Driver View</p>
        Welcome, {this.props.user.name}
        <p>
          You have set{" "}
          <span style={{ color: "green" }}>
            USh{this.props.user.driverData.price}
          </span>{" "}
          as the maximum charge for a ride.
        </p>
        <DriverUpdateLocation
          latInit={driverLat}
          lngInit={driverLng}
          storeLatLng={driverLatLng => this.handleUpdateDriverLoc(driverLatLng)}
        />
      </div>
    );
  }
}
