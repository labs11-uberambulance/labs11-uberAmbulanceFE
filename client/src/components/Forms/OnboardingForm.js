import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { fetchOnboardingForm } from "./FormsTemplate";

class OnboardingForm extends React.Component {
  handleRegister = e => {
    e.preventDefault();
    const form = this.state.controls;
    const userData = {
      name: form.name.elementAttri.value,
      login: form.email.elementAttri.value,
      google_id: form.email.elementAttri.value,
      phone: form.phoneNumber.elementAttri.value,
      user_type: "mothers"
    };
    console.log("handleRegister");
    this.props.registerUser(userData);
  };

  render() {
    // console.log("controls: ", this.state.controls);
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        frame: this.state.controls[key].elementAttri
      });
    }
    let inputs = formElementsArray.map(control => (
      <TextField
        key={control.id}
        {...control.frame}
        onChange={this.handleInput}
        name={control.id}
        autoComplete="off"
      />
    ));
    let inputsTwo = inputs.splice(
      Math.floor((inputs.length - 1) / 2) + 1,
      inputs.length - 1
    );
    return (
      <form onSubmit={this.handleRegister}>
        <Grid
          container
          spacing={32}
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
              {inputs}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
            >
              {inputsTwo}
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="button"
          color="secondary"
          onClick={() => this.props.goBack()}
        >
          Go Back
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    );
  }
  state = {
    controls: fetchOnboardingForm(this.props.userType),
    nextPage: false
  };
  handleInput = e => {
    e.persist();
    this.setState(prevState => {
      const { name, value } = e.target;
      const updatedControls = {
        ...prevState.controls,
        ...{
          [name]: {
            ...prevState.controls[name],
            ...{
              elementAttri: {
                ...prevState.controls[name].elementAttri,
                ...{ value }
              }
            }
          }
        }
      };
      return { controls: updatedControls };
    });
  };
}

export default OnboardingForm;