import React from "react";
import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

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
      photoInput: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = e => {
    e.preventDefault();
    console.log("register");
  };

  render() {
    return (
      <>
        <form onsubmit={this.handleRegister}>
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
                  name="nameInput"
                  value={this.state.nameInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  placeholder="Email"
                  name="emailInput"
                  value={this.state.emailInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  placeholder="Address"
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
                  name="phoneNumberInput"
                  value={this.state.phoneNumberInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="number"
                  placeholder="Rate per km"
                  name="rateInput"
                  value={this.state.rateInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  placeholder="Photo"
                  name="photoInput"
                  value={this.state.photoInput}
                  onChange={this.handleInput}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default withRouter(OnboardingForm);
