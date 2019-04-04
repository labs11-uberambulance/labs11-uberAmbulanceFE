import React, { Component } from "react";
import DriverProfileMenu from "./DriverProfileMenu";
import { Button } from "@material-ui/core";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleStatusClick = state => {
    this.setState({ active: !state.active });
  };

  render() {
    return (
      <div>
        <DriverProfileMenu />
        <p>Driver View</p>
        <Button
          color={this.state.active ? "secondary" : "error"}
          onClick={this.handleStatusClick}
        />
      </div>
    );
  }
}
