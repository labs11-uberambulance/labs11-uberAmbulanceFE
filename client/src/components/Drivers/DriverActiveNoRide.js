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
          <DriverActiveRides
            user={this.props.user}
            usrUpdate={this.props.usrUpdate}
            refreshUserData={this.props.refreshUserData}
          />
        </Grid>
      </div>
    );
  }
}
