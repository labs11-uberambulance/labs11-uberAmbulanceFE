import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class OnboardingSelector extends React.Component {
  setUserType(userType) {
    this.props.history.push(`/onboarding/${userType}`);
  }

  render() {
    return (
      <Grid container direction="column">
        <Button
          value="DRIVER"
          onClick={() => this.setUserType("driver")}
          color="primary"
        >
          DRIVER
        </Button>
        <Button
          value="PREGNANT MOTHER"
          onClick={() => this.setUserType("mother")}
          color="primary"
        >
          PREGNANT MOTHER
        </Button>
        <Button
          value="CAREGIVER"
          onClick={() => this.setUserType("caregiver")}
          color="primary"
        >
          CAREGIVER
        </Button>
      </Grid>
    );
  }
}

export default withRouter(OnboardingSelector);
