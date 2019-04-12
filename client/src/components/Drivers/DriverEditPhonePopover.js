import React from "react";
import { connect } from "react-redux";
import { initUsrUpdate } from "../../store/actions/auth";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
    user: {
      phone: this.props.user.phone
    }
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  updateFormUser = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = () => {
    const data = {
      user: {
        ...this.state.user
      }
    };
    this.props.initUsrUpdate(this.props.user, data);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <ListItem
          button
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="space-between"
          >
            <Grid item xs={4}>
              <ListItemIcon>
                <span style={{ color: "green" }}>{this.props.user.phone}</span>
              </ListItemIcon>
            </Grid>
            <Grid item xs={4}>
              <ListItemText>Contact Phone</ListItemText>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <EditIcon fontSize={"small"} />
            </Grid>
          </Grid>
        </ListItem>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          style={{ padding: "10px" }}
        >
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            label="phone"
            value={this.state.user.phone}
            type="text"
            fullWidth
            onChange={e => this.updateFormUser(e)}
          />
          <Button onClick={() => this.handleSubmit()} color="primary">
            Save
          </Button>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  initUsrUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplePopover);
