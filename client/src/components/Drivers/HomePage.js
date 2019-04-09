import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DriverProfileMenu from "./DriverProfileMenu";
import DriverHUD from "./DriverHUD";
import DriverActiveRides from "./DriverActiveRides";
import DriverUpdateLocation from "./DriverUpdateLocation";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nothing: ""
    };
  }

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
        <Grid
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
          <DriverActiveRides user={this.props.user} />
        </Grid>
        Your current Location: <br />
        (search or adjust pin and press "Set Location" to update)
        <DriverUpdateLocation
          latInit={driverLat}
          lngInit={driverLng}
          storeLatLng={driverLatLng => this.handleUpdateDriverLoc(driverLatLng)}
        />
      </div>
    );
  }
}
