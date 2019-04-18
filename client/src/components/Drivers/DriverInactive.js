import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import DriverHUD from "./DriverHUD";
import DriverUpdateLocation from "./DriverUpdateLocation";

export default class DriverInactive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpdateDriverLoc = driverLatLng => {
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
      <div style={{ padding: "50px" }}>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={6}>
            <DriverHUD
              user={this.props.user}
              usrUpdate={this.props.usrUpdate}
              usrLoading={this.props.usrLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <DriverUpdateLocation
                latInit={driverLat}
                lngInit={driverLng}
                storeLatLng={driverLatLng =>
                  this.handleUpdateDriverLoc(driverLatLng)
                }
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
