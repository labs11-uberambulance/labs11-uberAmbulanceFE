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
import MotherForm from "../../components/Forms/onBoardingForms/MotherForm";
import DriverForm from "../../components/Forms/onBoardingForms/DriverForm";
import CareGiversForm from "../../components/Forms/onBoardingForms/CareGiverForm";
import OnboardingConfirm from "../../components/OnboardingComponents/OnboardingConfirm";

const steps = [
  "Select User Type",
  "Enter Information",
  "Confirm Your Information"
];

function getStepContent(
  step,
  user,
  userType,
  setUserTypeHandler,
  handleNext,
  formValues
) {
  // console.log("getStepContent: ", formValues);
  switch (step) {
    case 0:
      return (
        <OnboardingSelector
          userType={userType}
          setUserType={setUserTypeHandler}
        />
      );
    case 1:
      if (userType === "mothers") {
        return <MotherForm user={user} onSubmitForm={handleNext} />;
      }
      if (userType === "drivers") {
        return <DriverForm user={user} onSubmitForm={handleNext} />;
      }
      if (userType === "caregivers") {
        return <CareGiversForm user={user} onSubmitForm={handleNext} />;
      }
      break;
    case 2:
      return <OnboardingConfirm formValues={formValues} />;
    default:
      throw new Error("Unknown step in OnboardingView");
  }
}

class OnboardingView extends Component {
  state = {
    activeStep: 0,
    userType: null,
    formValues: { name: "" }
  };

  handleNext = formValues => {
    console.log("handleNext: ", formValues);
    console.log("this.state.formvalues", this.state.formValues);
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    formValues &&
      this.setState(state => ({
        ...state,
        formValues
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
    this.setState({ userType: type });
  };

  returnToSelectorHandler = () => {
    this.setState({ userType: null });
  };

  render() {
    const { activeStep } = this.state;

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
            <Stepper activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
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
                  {getStepContent(
                    activeStep,
                    this.props.user,
                    this.state.userType,
                    this.setUserTypeHandler,
                    this.handleNext,
                    this.state.formValues
                  )}
                  <div>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack}>Back</Button>
                    )}
                    {activeStep === steps.length - 1 ? (
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
