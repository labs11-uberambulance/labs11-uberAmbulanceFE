import React from "react";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      editing: false,
      userData: {
        name: this.props.user.name
      },
      driverData: {
        rides: this.props.user.driverData.rides
      }
    };
  }
  updateFormDriver = e => {
    this.setState({
      driverData: {
        ...this.state.driverData,
        [e.target.name]: e.target.value
      }
    });
  };
  startEditing = () => {
    this.setState({ editing: true });
  };
  stopEditing = () => {
    this.setState({ editing: false });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, editing: false });
  };
  handleSubmit = () => {
    const data = {
      driver: {
        ...this.state.driverData
      }
    };
    this.props.initUsrUpdate(this.props.user, data);
  };
  render() {
    const { fullScreen } = this.props;
    const rides = this.props.user.driverData.rides.map(ride => {
      const status_color = ride.ride_status === "complete" ? "green" : "red";
      return (
        <div key={ride.id}>
          <DialogContentText>Date {ride.updated_at}</DialogContentText>
          <DialogContentText>From {ride.start}</DialogContentText>
          <DialogContentText>To {ride.destination}</DialogContentText>
          <DialogContentText>
            <p style={{ color: status_color }}>Status: {ride.ride_status}</p>
          </DialogContentText>
        </div>
      );
    });
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Ride History
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`${
            this.props.user.name
          }'s Ride History`}</DialogTitle>
          <DialogContent>{rides}</DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
