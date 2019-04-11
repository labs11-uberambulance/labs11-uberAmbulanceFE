import React, { Component } from "react";
import axios from "../../axios-instance";
import Button from "@material-ui/core/Button";
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
  },
  buttonError: {
    color: "amber"
  }
};

class DriverActiveRides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRejectHandler = rideData => {
    // send rejection to backend to update ride object (ride_id in 'data')
    // data: {
    //   distance: `${rideInfo.distance}`,
    //   name: rideInfo.name,
    //   phone: rideInfo.phone,
    //   price: `${rideInfo.price}`,
    //   ride_id: `${rideInfo.ride_id}`,
    //   hospital: `${rideInfo.hospital}`
    // }
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
      console.log("ride: ", ride);
      const rideDestMother = ride.destNameMother
        ? ride.destNameMother.plus_code.compound_code
        : "Unknown Location";
      const rideDestHospital = ride.destNameHospital
        ? ride.destNameHospital.plus_code.compound_code
        : "Unknown Location";
      return (
        <div key={ride.id}>
          Date: {moment(ride.updated_at).format("LLLL")}
          <br />
          From: {rideDestMother}
          <br />
          To: {rideDestHospital}
          <br />
          Price: {ride.price}
          <br />
          <p style={{ color: "red" }}>Status: {ride.ride_status}</p>
          <Button onClick={() => this.onAcceptHandler(ride.id)} color="primary">
            Accept Request
          </Button>
          <Button onClick={() => this.onRejectHandler(ride)}>
            Reject Request
          </Button>
        </div>
      );
    });
    return (
      <Card className={classes.card}>
        <CardContent>
          Ride Requests:
          {rideRequests}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(DriverActiveRides);
