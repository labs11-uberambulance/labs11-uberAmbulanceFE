import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DriverHUD from "./DriverHUD";
import DriverUpdateLocation from "./DriverUpdateLocation";

export default class DriverInactive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          spacing={16}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <DriverHUD
              user={this.props.user}
              usrUpdate={this.props.usrUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            My Current Location:
            <DriverUpdateLocation
              latInit={driverLat}
              lngInit={driverLng}
              storeLatLng={driverLatLng =>
                this.handleUpdateDriverLoc(driverLatLng)
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
