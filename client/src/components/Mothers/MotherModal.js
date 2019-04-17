import React from "react";
import { connect } from "react-redux";
import { initUsrUpdate } from "../../store/actions/auth";
import BikeLogo from '../../assests/images/birth_ride_logo_cycle.png'
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import TextField from "@material-ui/core/TextField";

class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.nameInp = React.createRef();
    this.phoneInp = React.createRef();
    this.emailInp = React.createRef();
    this.dueDateInp = React.createRef();

    this.state = {
      editing: false,
      userData: {
        name: this.props.user.name,
        phone: this.props.user.phone,
        email: this.props.user.email
      },
      momData: {
        due_date: this.props.user.motherData.due_date
      }
    };
  }
  updateForm = e => {
    this.setState({
      userData: {
        ...this.state.userData,
        [e.target.name]: e.target.value
      }
    });
  };
  updateFormMom = e => {
    this.setState({
      momData: {
        ...this.state.momData,
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
  handleSubmit = () => {
    const data = {
      user: {
        ...this.state.userData
      },
      mother: {
        ...this.state.momData
      }
    };
    this.stopEditing()
    this.props.initUsrUpdate(this.props.user, data);
  };
  exit = () =>{
    this.stopEditing();
    this.props.handleClose()
  }
  render() {
    const { fullScreen } = this.props;
    console.log(this.props);
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <div style={{
          width: "90%",
          height: '115px',
          background: `url(${BikeLogo}) center / cover no-repeat`,
          margin: '10px auto',
          borderRadius: '5px',
        }}></div>
          <DialogTitle id="responsive-dialog-title">{`${
            this.props.user.name
          }'s Profile`}</DialogTitle>
          <DialogContent>
            {this.state.editing ? (
              <>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  name="name"
                  label="Name"
                  value={this.state.userData.name}
                  type="text"
                  fullWidth
                  onChange={e => this.updateForm(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  name="phone"
                  inputRef={this.phoneInp}
                  label="Phone Number"
                  value={this.state.userData.phone}
                  type="phone"
                  fullWidth
                  onChange={e => this.updateForm(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  name="email"
                  inputRef={this.emailInp}
                  label="Email Address"
                  value={this.state.userData.email}
                  type="email"
                  fullWidth
                  onChange={e => this.updateForm(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  variant="outlined"
                  autoFocus
                  margin="normal"
                  placeholder="MM/DD/YYYY"
                  name="due_date"
                  label="Due Date"
                  inputRef={this.dueDateInp}
                  value={this.state.momData.due_date}
                  type="date"
                  fullWidth
                  onChange={e => this.updateFormMom(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            ) : (
              <>
                <DialogContentText>
                  Name: {this.props.user.name}
                </DialogContentText>
                <DialogContentText>
                  Phone: {this.props.user.phone}
                </DialogContentText>
                <DialogContentText>
                  Email: {this.props.user.email}
                </DialogContentText>
                <DialogContentText>
                  Due Date: {this.props.user.motherData.due_date}
                </DialogContentText>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {this.state.editing ? (
              <Button onClick={e => this.handleSubmit(e)} color="primary">
                Save
              </Button>
            ) : (
              <Button onClick={e => this.startEditing(e)} color="primary">
                Edit
              </Button>
            )}
            <Button onClick={this.exit} color="primary" autoFocus>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  initUsrUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(ResponsiveDialog));
