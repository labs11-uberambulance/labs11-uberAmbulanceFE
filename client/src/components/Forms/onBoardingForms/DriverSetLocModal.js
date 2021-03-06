import React from "react";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import OnboardingSetLocation from "../../OnboardingComponents/OnboardingSetLocation";

class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      editing: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSaveLoc = latLng => {
    this.props.storeLatLng(latLng);
    this.handleClose();
  };
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button
          style={
            this.props.isSet
              ? { backgroundColor: "#03a9f4", color: "white" }
              : { backgroundColor: "#9e9e9e", color: "white" }
          }
          onClick={this.handleClickOpen}
        >
          Set Base Location
        </Button>
        <Dialog
          fullWidth
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Set your location:
          </DialogTitle>
          <DialogContent>
            <OnboardingSetLocation
              storeLatLng={latLng => this.handleSaveLoc(latLng)}
            />
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={() => this.handleSaveLoc()} color="primary">
              Save
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
