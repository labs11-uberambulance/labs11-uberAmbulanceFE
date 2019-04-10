import React, { Component } from "react";
import axios from "../../axios-instance";
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

  onArriveHandler = id => {
    console.log("Arrived at mother. ride id: ", id);
    // update ride status, notifies mother of driver's arrival
    axios
      .get(`/api/rides/driver/arrives/${id}`)
      .then(result => {
        console.log("Ride status updated. status: ", result.status);
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCompleteHandler = id => {
    console.log("Ride Complete. ride id: ", id);
    // update ride status, notifies mother of driver's arrival
    axios
      .get(`/api/rides/driver/delivers/${id}`)
      .then(result => {
        console.log("Ride status updated. status: ", result.status);
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCancelHandler = id => {
    console.log("Cancel Ride ", id);
    const data = {
      ride_id: id,
      price: 999
    };
    axios
      .post(`/api/rides/driver/rejects/${id}`, { data })
      .then(result => {
        console.log("ride reject success: ", result);
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const currentRide = this.props.currentRide;
    let start, stop;
    console.log(currentRide);
    if (currentRide.ride_status === "Driver en route") {
      start = this.props.user.location.latlng;
      stop = currentRide.start;
      console.log("en route: ", start, stop);
    } else if (currentRide.ride_status === "arrived_at_mother") {
      start = currentRide.start;
      stop = currentRide.destination;
      console.log("at mother: ", start, stop);
    } else {
      start = "0,0";
      stop = "0,0";
    }
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
          <Card style={{ width: "300px" }}>
            Mother's Location:{" "}
            {currentRide.destNameMother.plus_code.compound_code}
            Hospital Name:{" "}
            {currentRide.destNameHospital.plus_code.compound_code}
            {currentRide.ride_status === "Driver en route" ? (
              <Button
                onClick={() => this.onArriveHandler(currentRide.id)}
                color="primary"
              >
                Arrived at Mother
              </Button>
            ) : (
              <Button
                onClick={() => this.onCompleteHandler(currentRide.id)}
                color="primary"
              >
                Ride Complete
              </Button>
            )}
            {currentRide.ride_status != "arrived_at_mother" && (
              <Button onClick={() => this.onCancelHandler(currentRide.id)}>
                Cancel Ride
              </Button>
            )}
          </Card>
        </Grid>
        {currentRide.ride_status === "Driver en route" ? (
          <h1>Route To Mother </h1>
        ) : (
          <h1> Route To Hospital</h1>
        )}
        <RouteMap start={start} stop={stop} />
      </div>
    );
  }
}
