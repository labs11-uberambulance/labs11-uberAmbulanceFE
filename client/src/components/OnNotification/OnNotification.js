import React, { Component } from "react";
import { messaging } from "../../firebase";
import { Paper, Typography, withStyles, Button } from "@material-ui/core";
import axios from "../../axios-instance";
import "./OnNotification.css";

const styles = ({ palette }) => ({
  root: {
    width: "unset",
    padding: "10px"
  }
});

class OnNotification extends Component {
  state = {
    notification: null,
    data: null,
    timer: null
  };

  onRejectHandler = () => {
    // send rejection to backend to update ride object (ride_id will be in 'data')
    axios
      .post(`/api/rides/driver/rejects/${this.state.data.ride_id}`, {
        ...this.state
      })
      .then(result => {
        this.setState({ notification: null, data: null });
      })
      .catch(err => {
        console.log(err);
        this.setState({ notification: null, data: null });
      });
    this.setState({ notification: null, data: null });
  };
  onAcceptHandler = () => {
    // send acceptance to backend to update ride object (ride_id will be in 'data')
    axios
      .get(`/api/rides/driver/accepts/${this.state.data.ride_id}`)
      .then(result => {
        this.setState({ notification: null, data: null });
      })
      .catch(err => {
        console.log(err);
        this.setState({ notification: null, data: null });
      });
    // update driver data, retrieves new ride info
    this.props.usrUpdate(this.props.user);
  };

  render() {
    if (!this.state.notification) {
      return null;
    }
    const { title, body } = this.state.notification;
    return (
      <aside className="notification-container">
        <Paper className={this.props.classes.root}>
          <Typography component="h4">
            {title}
          </Typography>
          <Typography component="p">{body}</Typography>
          <Button color="primary" onClick={this.onAcceptHandler}>
            Accept
          </Button>
          <Button color="inherit" onClick={this.onRejectHandler}>
            Reject
          </Button>
        </Paper>
      </aside>
    );
  }
  componentDidMount() {
    messaging.onMessage(({ data, notification }) => {
      this.setState({ notification, data });
      const timer = setTimeout(() => {
        this.setState({ notification: null, data: null });
        // update driver data, retrieves new ride info
        this.props.usrUpdate(this.props.user);
      }, 10000);
      this.setState({ timer });
    });
  }
  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }
}

export default withStyles(styles)(OnNotification);
