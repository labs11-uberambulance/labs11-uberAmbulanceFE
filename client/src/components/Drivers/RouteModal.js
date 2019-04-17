import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import RouteMap from "../../components/GoogleMaps/RouteMap/RouteMap";

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

export default SimpleModal;
