import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DriverProfileMenu from "./DriverProfileMenu";
import RouteMap from "../../components/GoogleMaps/RouteMap/RouteMap";

export default class DriverActiveOnRide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onArriveHandler = () => {
    console.log("Arrived at mother.");
  };

  onRejectHandler = () => {
    console.log("Cancel Ride");
  };

  render() {
    const currentRide = this.props.currentRide;
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
          <Card>
            Mother's Location:{" "}
            {currentRide.destNameMother.plus_code.compound_code}
            Hospital Name:{" "}
            {currentRide.destNameHospital.plus_code.compound_code}
            <Button
              onClick={() => this.onArriveHandler(currentRide.id)}
              color="primary"
            >
              Arrived at Mother
            </Button>
            <Button onClick={() => this.onRejectHandler(currentRide.id)}>
              Cancel Ride
            </Button>
          </Card>
        </Grid>
        <RouteMap
          start={this.props.user.location.latlng}
          stop={currentRide.start}
        />
      </div>
    );
  }
}
