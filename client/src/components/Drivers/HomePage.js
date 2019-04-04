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
      </div>
    );
  }
}
