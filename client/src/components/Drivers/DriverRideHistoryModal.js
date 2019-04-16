import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import RideCard from "./RideCard";

class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, editing: false });
  };

  render() {
    const { fullScreen } = this.props;
    const prevRides = this.props.user.driverData.rides
      .filter(ride => ride.ride_status === "complete")
      .map(ride => {
        return <RideCard key={ride.id} ride={ride} />;
      });
    return (
      <div>
        <Button
          // variant="outlined"
          // // color="primary"
          style={{ color: "white", backgroundColor: "#0277bd" }}
          onClick={this.handleClickOpen}
          fullWidth
        >
          Rides
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {/* <CardMedia
            component="img"
            alt="DriverImg"
            height="70"
            width="70"
            image={this.props.user.driverData.photo_url}
            title="Driver"
            style={{
              width: "70px",
              borderRadius: "10px"
            }}
          /> */}
          <DialogTitle id="responsive-dialog-title">{`${
            this.props.user.name
          }'s Ride History`}</DialogTitle>
          <DialogContent>{prevRides}</DialogContent>
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
