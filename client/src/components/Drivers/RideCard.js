import React from "react";
import moment from "moment";
import motorcycle from "../../assests/images/motorcycle.svg";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RouteModal from "./RouteModal";

export default function RideCard(props) {
  const { ride } = props;
  const status_color = ride.ride_status === "complete" ? "green" : "red";
  const rideDestMother = ride.start_name ? ride.start_name : "Unknown Location";
  const rideDestHospital = ride.dest_name ? ride.dest_name : "Unknown Location";
  return (
    <Card>
      <Grid container direction="row" justify="center" alignItems="center">
        <CardMedia style={{ width: "70px" }}>
          <img src={motorcycle} alt="motorcycle" />
        </CardMedia>
        <CardContent style={{ textAlign: "left" }}>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>Date: </span>
            {moment(ride.updated_at).format("LLLL")}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>From: </span>
            {rideDestMother}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>To: </span>
            {rideDestHospital}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>Price: </span>
            {ride.price}
          </Typography>
          <RouteModal start={ride.start} stop={ride.destination} />
          <Typography variant="body1">
            <p style={{ color: status_color }}>
              <span style={{ fontWeight: "bold" }}>Status: </span>
              {ride.ride_status}
            </p>
          </Typography>
        </CardContent>
      </Grid>
      {ride.ride_status !== "complete" && (
        <>
          <Button
            onClick={() => props.onAcceptHandler(ride.id)}
            // color="primary"
            style={{ color: "rgb(0,133,115)" }}
          >
            Accept Request
          </Button>
          <Button
            style={{ color: "darkred" }}
            onClick={() => props.onRejectHandler(ride)}
          >
            Reject Request
          </Button>
        </>
      )}
    </Card>
  );
}
