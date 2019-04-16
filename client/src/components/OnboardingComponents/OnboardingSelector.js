import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../Forms/onBoardingForms/onBoardingForm.css";

const onboardingSelector = props => (
  <div className="authentication-background">
    <form className="auth-form">
      <h3>Are you a:</h3>
      <Grid container direction="column">
        <Button
          value="DRIVER"
          onClick={() => props.setUserType("drivers")}
          color={props.userType === "drivers" ? "secondary" : "primary"}
        >
          DRIVER
        </Button>
        <Button
          value="PREGNANT MOTHER"
          onClick={() => props.setUserType("mothers")}
          color={props.userType === "mothers" ? "secondary" : "primary"}
        >
          PREGNANT MOTHER
        </Button>
        <Button
          value="CAREGIVER"
          onClick={() => props.setUserType("caregivers")}
          color={props.userType === "caregivers" ? "secondary" : "primary"}
        >
          CAREGIVER
        </Button>
        <Button onClick={() => props.redir("/logout")}>CANCEL</Button>
      </Grid>
    </form>
  </div>
);

export default onboardingSelector;
