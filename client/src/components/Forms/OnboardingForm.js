import React from "react";
import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class OnboardingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: "", //this.props.user.name,
      emailInput: "", //this.props.user.email,
      addressDescriptionInput: "",
      addressNearestTownInput: "",
      phoneNumberInput: "",
      rateInput: "",
      photoInput: "",
      dueDateInput: "",
      caregiverInput: "",
      motherInput: "",
      guardianInput: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBoolInput = e => {
    e.persist();
    this.setState(prevState => ({
      [e.target.name]: !prevState[e.target.name]
    }));
  };

  handleRegister = e => {
    e.preventDefault();
    console.log("register");
  };

  render() {
    return (
      <>
        <form onsubmit={this.handleRegister}>
          {this.props.userType}
          <Grid
            container
            spacing="32"
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <TextField
                  type="text"
                  placeholder="Name"
                  label="Name"
                  name="nameInput"
                  value={this.state.nameInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  placeholder="Email"
                  label="Email"
                  name="emailInput"
                  value={this.state.emailInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  placeholder="Address"
                  label="Address"
                  name="addressDescriptionInput"
                  value={this.state.addressDescriptionInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                  multiline
                  rows="3"
                />
                <TextField
                  type="text"
                  placeholder="Nearest Town"
                  label="Nearest Town"
                  name="addressNearestTownInput"
                  value={this.state.addressNearestTownInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <TextField
                  type="tel"
                  placeholder="Phone Number"
                  label="Phone Number"
                  name="phoneNumberInput"
                  value={this.state.phoneNumberInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                {this.props.userType === "driver" && (
                  <TextField
                    type="number"
                    placeholder="Rate per km"
                    label="Rate per km"
                    name="rateInput"
                    value={this.state.rateInput}
                    onChange={this.handleInput}
                    autoComplete="off"
                  />
                )}
                {this.props.userType === "mother" && (
                  <>
                    <TextField
                      type="date"
                      placeholder="Due Date"
                      label="Due Date"
                      name="dueDateInput"
                      value={this.state.dueDateInput}
                      onChange={this.handleInput}
                      autoComplete="off"
                    />
                    <TextField
                      type="text"
                      placeholder="Caregiver"
                      label="Caregiver"
                      name="caregiverInput"
                      value={this.state.caregiverInput}
                      onChange={this.handleInput}
                      autoComplete="off"
                    />
                  </>
                )}
                {this.props.userType === ("mother" || "driver") && (
                  <TextField
                    type="text"
                    placeholder="Photo"
                    label="Photo"
                    name="photoInput"
                    value={this.state.photoInput}
                    onChange={this.handleInput}
                    autoComplete="off"
                  />
                )}
                {this.props.userType === "caregiver" && (
                  <>
                    <TextField
                      type="text"
                      placeholder="Mother"
                      label="Mother"
                      name="motherInput"
                      value={this.state.motherInput}
                      onChange={this.state.handleInput}
                      autoComplete="off"
                    />
                    <FormControlLabel
                      label="Are you mother's guardian?"
                      control={
                        <Checkbox
                          name="guardianInput"
                          checked={this.state.guardianInput}
                          label="Are you mother's guardian?"
                          onChange={this.handleBoolInput}
                        />
                      }
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default withRouter(OnboardingForm);
