import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DriverProfileMenu from "./DriverProfileMenu";
import DriverHUD from "./DriverHUD";
import DriverActiveRides from "./DriverActiveRides";

export default class DriverActiveNoRide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: "50px" }}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={24}
        >
          <Grid item xs={12} sm={6}>
            <DriverHUD
              user={this.props.user}
              usrUpdate={this.props.usrUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DriverActiveRides
              user={this.props.user}
              usrUpdate={this.props.usrUpdate}
              refreshUserData={this.props.refreshUserData}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
