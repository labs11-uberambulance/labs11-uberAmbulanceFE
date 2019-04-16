import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import RouteMap from "../../components/GoogleMaps/RouteMap/RouteMap";

const styles = theme => ({
  paper: {
    // position: 'absolute',
    // width: theme.spacing.unit * 50,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
    // outline: 'none',
  }
});

class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="primary" onClick={this.handleOpen} fullWidth>
          Map
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              transform: `translate(0, 15%)`,
              outline: "none"
            }}
          >
            <RouteMap start={this.props.start} stop={this.props.stop} />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
