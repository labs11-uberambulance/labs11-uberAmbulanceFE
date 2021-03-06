import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import DriverEditPricePopover from "./DriverEditPricePopover";
import DriverEditPhonePopover from "./DriverEditPhonePopover";
import EditProfileImg from "./EditProfilePic";
import ProgressCircular from "../Progress/Circular";

const styles = {
  card: {
    minWidth: 275
  },
  buttonActive: {
    color: "purple"
  },
  buttonInactive: {
    color: "rgb(0,133,115)"
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

  render() {
    const { classes } = this.props;
    const statusStyle = this.props.user.driverData.active
      ? {
          background:
            "linear-gradient(0deg, rgba(12,94,13,1) 0%, rgba(44,172,42,1) 100%)",
          height: "100px"
        }
      : {
          background:
            "linear-gradient(0deg, rgba(94,12,12,1) 0%, rgba(172,42,42,1) 100%)",
          height: "100px"
        };
    const activeButtonColor = this.props.user.driverData.active
      ? "#0277bd"
      : "rgb(0,133,115)";
    return (
      <Card className={classes.card}>
        {/* Status indication card */}
        <Card style={statusStyle}>
          {/* Buttons grid */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button
                style={{ backgroundColor: activeButtonColor, color: "white" }}
                variant="contained"
                onClick={this.handleStatusClick}
              >
                {this.props.user.driverData.active
                  ? "Set Inactive"
                  : "Set Active"}
              </Button>
            </Grid>
            {/* <Grid item>
              <Button
                style={{ backgroundColor: "#0277bd", color: "white" }}
                variant="contained"
                onClick={() => {
                  this.props.history.push("/logout");
                }}
              >
                Log Out
              </Button>
            </Grid> */}
          </Grid>
        </Card>
        {/* profile img alignment grid */}
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid
            item
            style={{
              marginTop: "-60px"
            }}
          >
            {/* <CardMedia
              component="img"
              alt="DriverImg"
              image={this.props.user.driverData.photo_url}
              title="Driver"
              style={{
                height: "140px",
                width: "140px",
                borderRadius: "40px",
                marginTop: "-70px",
                overflow: "hidden"
              }}
            /> */}
            <EditProfileImg
              currImg={this.props.user.driverData.photo_url}
              btnStyle={{ borderRadius: "40px" }}
              display={
                <div
                  style={{
                    background: `url(${
                      this.props.user.driverData.photo_url
                    }) 50% 50% / cover no-repeat`,
                    height: "140px",
                    width: "140px",
                    borderRadius: "40px"
                  }}
                />
              }
            />
          </Grid>
          {this.props.usrLoading && (
            <div style={{ position: "absolute", marginTop: "53px" }}>
              <ProgressCircular size={20} />
            </div>
          )}
        </Grid>
        <CardContent>
          <Typography
            // style={{ marginTop: "-20px", paddingTop: "20px" }}
            variant="h6"
            gutterBottom
          >
            Welcome, {this.props.user.name}
          </Typography>
          <Card>
            <List>
              <DriverEditPricePopover />
              <DriverEditPhonePopover />
            </List>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(DriverHUD));
