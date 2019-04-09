import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 400
  },
  button: {
    width: "100%"
  }
};

class DriverActiveRides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    // console.log("driverActiveRides, ", navigator.languages[0]);
    const rides = this.props.user.driverData.rides.map(ride => {
      if (ride.ride_status != "complete") {
        return (
          <div key={ride.id}>
            Date {moment(ride.updated_at).format("LLLL")}
            <br />
            Price "PUT THE REAL PRICE HERE"
            <br />
            To {ride.destination}
            <p style={{ color: "red" }}>Status: {ride.ride_status}</p>
          </div>
        );
      }
    });
    return (
      <Card className={classes.card}>
        <CardContent>
          Pending Rides:
          {rides}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(DriverActiveRides);
