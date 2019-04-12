import React from "react";
import moment from "moment";
import motorcycle from "../../assests/images/motorcycle.svg";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function RideCard(props) {
  const { ride } = props;
  const status_color = ride.ride_status === "complete" ? "green" : "red";
  const rideDestMother = ride.destNameMother
    ? ride.destNameMother.plus_code.compound_code
    : "Unknown Location";
  const rideDestHospital = ride.destNameHospital
    ? ride.destNameHospital.plus_code.compound_code
    : "Unknown Location";
  return (
    <Card>
      <Grid container direction="row" justify="center" alignItems="center">
        <CardMedia style={{ width: "70px" }}>
          <img src={motorcycle} />
        </CardMedia>
        <CardContent>
          <Typography variant="body1">
            Date: {moment(ride.updated_at).format("LLLL")}
          </Typography>
          <Typography variant="body1">From: {rideDestMother}</Typography>
          <Typography variant="body1">To: {rideDestHospital}</Typography>
          <Typography variant="body1">Price: {ride.price}</Typography>
          <Typography variant="body1">
            <p style={{ color: status_color }}>Status: {ride.ride_status}</p>
          </Typography>
        </CardContent>
      </Grid>
    </Card>
  );
}
