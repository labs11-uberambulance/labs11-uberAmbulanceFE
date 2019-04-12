import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import DriverEditProfileModal from "./DriverEditProfileModal";
import DriverEditPricePopover from "./DriverEditPricePopover";
import DriverEditPhonePopover from "./DriverEditPhonePopover";
import EditProfileImg from "./EditProfilePic";
import DriverRideHistoryModal from "./DriverRideHistoryModal";

const styles = {
  card: {
    minWidth: 275
  },
  button: {
    // width: "100%",
    // size: "large",
    // height: "100px",
    // marginBottom: "100px"
  }
};

class DriverHUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRides: false
    };
  }

  handleStatusClick = () => {
    this.props.usrUpdate(this.props.user, {
      driver: { active: !this.props.user.driverData.active }
    });
  };

  // togglePrevRides = () => {
  //   this.setState(state => ({ prevRides: !state.prevRides }));
  // };

  render() {
    const { classes } = this.props;
    const statusColor = this.props.user.driverData.active
      ? "darkgreen"
      : "darkred";
    // const prevRides = this.props.user.driverData.rides
    //   .filter(ride => ride.ride_status === "complete")
    //   .map(ride => {
    //     return (
    //       <Card key={ride.id}>
    //         <Typography variant="body1">Date {ride.updated_at}</Typography>
    //         <Typography variant="body1">From {ride.start}</Typography>
    //         <Typography variant="body1">To {ride.destination}</Typography>
    //         <Typography variant="body1">
    //           <p style={{ color: "green" }}>Status: {ride.ride_status}</p>
    //         </Typography>
    //       </Card>
    //     );
    //   });
    return (
      <Card className={classes.card}>
        {/* Status indication card */}
        <Card style={{ backgroundColor: statusColor, height: "100px" }}>
          {/* Buttons grid */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button
                className={classes.button}
                color={
                  this.props.user.driverData.active ? "secondary" : "primary"
                }
                variant="contained"
                onClick={this.handleStatusClick}
                // fullWidth
                // sizeLarge
              >
                {this.props.user.driverData.active
                  ? "Set Inactive"
                  : "Set Active"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  this.props.history.push("/logout");
                }}
                // fullWidth
                // sizeLarge
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
        </Card>
        {/* profile img alignment grid */}
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <CardMedia
              component="img"
              alt="DriverImg"
              height="140"
              width="140"
              image={this.props.user.driverData.photo_url}
              title="Driver"
              style={{
                width: "140px",
                borderRadius: "40px",
                marginTop: "-70px"
              }}
            />
            <EditProfileImg currImg={this.props.user.driverData.photo_url} />
          </Grid>
        </Grid>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome, {this.props.user.name}
          </Typography>
          <Card>
            <List>
              <DriverEditPricePopover />
              <DriverEditPhonePopover />
              {/* <ListItem button>
                <ListItemIcon>
                  <span style={{ color: "green" }}>
                    {this.props.user.phone}
                  </span>
                </ListItemIcon>
                <ListItemText>Contact Phone</ListItemText>
              </ListItem> */}
            </List>
          </Card>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <DriverEditProfileModal
                className={classes.button}
                user={this.props.user}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DriverRideHistoryModal user={this.props.user} />
            </Grid>
          </Grid>
        </CardActions>
        {/* {this.state.prevRides && prevRides} */}
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(DriverHUD));
