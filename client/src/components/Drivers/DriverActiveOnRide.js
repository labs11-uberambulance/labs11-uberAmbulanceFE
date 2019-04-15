import React, { Component } from "react";
import axios from "../../axios-instance";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
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
      ride_id: id
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
      <div style={{ padding: "50px" }}>
        <Card>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            spacing={32}
          >
            <Grid item md={8} sm={12}>
              {currentRide.ride_status === "Driver en route" ? (
                <h1>Route To Mother </h1>
              ) : (
                <h1> Route To Hospital</h1>
              )}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Card style={{ textAlign: "left", padding: "15px" }}>
                <Typography variant="h6">Ride Controls</Typography>
                <Typography variant="body2">
                  {`Mother's Location: ${currentRide.start_name}`}
                </Typography>
                <Typography variant="body2">
                  {`Hospital Name: ${currentRide.dest_name}`}
                </Typography>

                {currentRide.ride_status === "Driver en route" ? (
                  <Button
                    onClick={() => this.onArriveHandler(currentRide.id)}
                    // color="primary"
                    style={{ color: "rgb(0,133,115)" }}
                  >
                    Arrived at Mother
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.onCompleteHandler(currentRide.id)}
                    // color="primary"
                    style={{ color: "rgb(0,133,115)" }}
                  >
                    Ride Complete
                  </Button>
                )}
                {currentRide.ride_status != "arrived_at_mother" && (
                  <Button
                    style={{ color: "darkred" }}
                    onClick={() => this.onCancelHandler(currentRide.id)}
                  >
                    Cancel Ride
                  </Button>
                )}
              </Card>
            </Grid>
            <RouteMap start={start} stop={stop} />
          </Grid>
        </Card>
      </div>
    );
  }
}
