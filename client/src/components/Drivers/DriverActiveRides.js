import React, { Component } from "react";
import axios from "../../axios-instance";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import RideCard from "./RideCard";

class DriverActiveRides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRejectHandler = rideData => {
    const data = {
      ride_id: rideData.id
    };
    axios
      .post(`/api/rides/driver/rejects/${rideData.id}`, { data })
      .then(result => {
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  onAcceptHandler = id => {
    // send acceptance to backend to update ride object (ride_id will be in 'data')
    axios
      .get(`/api/rides/driver/accepts/${id}`)
      .then(result => {
        // set driver status to inactive so he can not accept more rides
        this.props.usrUpdate(this.props.user, {
          driver: { active: false }
        });
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const activeRides = this.props.user.driverData.rides.filter(
      ride => ride.ride_status !== "complete"
    );
    const rideRequests = activeRides.map(ride => {
      return (
        <Grid item xs={12} key={ride.id}>
          <RideCard
            ride={ride}
            key={ride.id}
            onAcceptHandler={this.onAcceptHandler}
            onRejectHandler={this.onRejectHandler}
          />
        </Grid>
      );
    });
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {activeRides.length
              ? "Ride Requests:"
              : "No requests at this time."}
          </Typography>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={16}
          >
            {rideRequests}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default DriverActiveRides;
