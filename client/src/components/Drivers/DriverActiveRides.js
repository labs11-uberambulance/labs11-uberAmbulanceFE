import React, { Component } from "react";
import axios from "../../axios-instance";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import RideCard from "./RideCard";

const styles = {
  // card: {
  // minWidth: 275,
  // maxWidth: 400
  // },
  // button: {
  //   width: "100%"
  // },
  // buttonError: {
  //   color: "amber"
  // }
};

class DriverActiveRides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRejectHandler = rideData => {
    const data = {
      ride_id: rideData.id
    };
    console.log("Ride rejected, rideData: ", rideData);
    axios
      .post(`/api/rides/driver/rejects/${rideData.id}`, { data })
      .then(result => {
        console.log("ride reject success: ", result);
        // need to do this since ride data is not automatically updated on application state with update to user data.
        this.props.refreshUserData(this.props.user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  onAcceptHandler = id => {
    // send acceptance to backend to update ride object (ride_id will be in 'data')
    console.log("Ride accepted, id: ", id);
    axios
      .get(`/api/rides/driver/accepts/${id}`)
      .then(result => {
        console.log("Ride accepted, id: ", id, " status ", result.status);
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
    const { classes } = this.props;
    const activeRides = this.props.user.driverData.rides.filter(
      ride => ride.ride_status != "complete"
    );
    const rideRequests = activeRides.map(ride => {
      return (
        <>
          <RideCard
            ride={ride}
            onAcceptHandler={this.onAcceptHandler}
            onRejectHandler={this.onRejectHandler}
          />
        </>
      );
    });
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">
            {activeRides.length
              ? "Active Requests:"
              : "No requests at this time."}
          </Typography>
          {rideRequests}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(DriverActiveRides);
