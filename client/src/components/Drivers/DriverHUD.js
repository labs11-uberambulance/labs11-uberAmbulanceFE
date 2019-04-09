import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";

import DriverEditProfileModal from "./DriverEditProfileModal";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 400
  },
  button: {
    width: "100%"
  }
};

class DriverHUD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStatusClick = () => {
    this.props.usrUpdate(this.props.user, {
      driver: { active: !this.props.user.driverData.active }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActions>
          <Button
            className={classes.button}
            color={this.props.user.driverData.active ? "secondary" : "primary"}
            variant="contained"
            onClick={this.handleStatusClick}
          >
            {this.props.user.driverData.active ? "Set Inactive" : "Set Active"}
          </Button>
        </CardActions>
        <CardContent>
          Welcome, {this.props.user.name}
          <p>
            You have set{" "}
            <span style={{ color: "green" }}>
              USh{this.props.user.driverData.price}
            </span>{" "}
            as the maximum charge for a ride.
          </p>
        </CardContent>
        <CardActions>
          <DriverEditProfileModal
            className={classes.button}
            user={this.props.user}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(DriverHUD);
