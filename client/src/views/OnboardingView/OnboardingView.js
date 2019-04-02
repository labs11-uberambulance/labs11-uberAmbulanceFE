import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

// MUI components for stepper
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/checkout/Checkout.js
// import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingSetLocation from "../../components/OnboardingComponents/OnboardingSetLocation";
import MotherForm from "../../components/Forms/onBoardingForms/MotherForm";
import DriverForm from "../../components/Forms/onBoardingForms/DriverForm";
import CareGiversForm from "../../components/Forms/onBoardingForms/CareGiverForm";
import OnboardingConfirm from "../../components/OnboardingComponents/OnboardingConfirm";

class OnboardingView extends Component {
  state = {
    activeStep: 0,
    steps: [
      "Select User Type",
      "Select Your Location",
      "Enter Information",
      "Confirm Your Information"
    ],
    formValues: { type: "" }
  };

  getStepContent() {
    const userType = this.state.formValues.type;
    // console.log("getStepContent: ", formValues);
    switch (this.state.activeStep) {
      case 0:
        return (
          <OnboardingSelector
            userType={userType}
            setUserType={this.setUserTypeHandler}
          />
        );
      case 1:
        return <OnboardingSetLocation />;
      case 2:
        if (userType === "mothers") {
          return (
            <MotherForm
              user={this.props.user}
              storeFormValues={this.storeFormValues}
              onSubmitForm={this.handleNext}
            />
          );
        }
        if (userType === "drivers") {
          return (
            <DriverForm
              user={this.props.user}
              storeFormValues={this.storeFormValues}
              onSubmitForm={this.handleNext}
            />
          );
        }
        if (userType === "caregivers") {
          return (
            <CareGiversForm
              user={this.props.user}
              storeFormValues={this.storeFormValues}
              onSubmitForm={this.handleNext}
            />
          );
        }
        break;
      case 3:
        return <OnboardingConfirm formValues={this.state.formValues} />;
      default:
        throw new Error("Unknown step in OnboardingView");
    }
  }

  storeFormValues = formValues => {
    console.log("storeFVs OnbrdView", formValues);
    formValues &&
      this.setState(state => ({
        ...state,
        formValues
      }));
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleSubmit = () => {
    this.props.onSubmitForm(this.props.user, this.state.formValues);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  setUserTypeHandler = type => {
    // console.log("setting user type: ", type);
    this.setState({ formValues: { type } });
  };

  returnToSelectorHandler = () => {
    this.setState({ userType: null });
  };

  render() {
    return (
      <>
        {/* <AppBar position="absolute" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Welcome to Birthride!
            </Typography>
          </Toolbar>
        </AppBar> */}
        <main>
          <Paper>
            <Typography component="h1" variant="h4" align="center">
              Register
            </Typography>
            <Stepper activeStep={this.state.activeStep}>
              {this.state.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === this.state.steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent()}
                  <div>
                    {this.state.activeStep !== 0 && (
                      <Button onClick={this.handleBack}>Back</Button>
                    )}
                    {this.state.activeStep === this.state.steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Confirm
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegisteringUser: state.isRegisteringUser // delete this?
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: (user, formValues) =>
      dispatch(actions.auth.initOnbrd(user, formValues))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingView);
