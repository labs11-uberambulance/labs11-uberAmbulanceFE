import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class OnboardingSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSetUserType(userType) {
    this.props.setUserType(userType);
    this.props.history.push(`/onboarding/${userType}`);
  }

  render() {
    return (
      <Grid container direction="column">
        <Button
          value="DRIVER"
          onClick={() => this.handleSetUserType("driver")}
          color="primary"
        >
          DRIVER
        </Button>
        <Button
          value="PREGNANT MOTHER"
          onClick={() => this.handleSetUserType("mother")}
          color="primary"
        >
          PREGNANT MOTHER
        </Button>
        <Button
          value="CAREGIVER"
          onClick={() => this.handleSetUserType("caregiver")}
          color="primary"
        >
          CAREGIVER
        </Button>
      </Grid>
    );
  }
}

export default withRouter(OnboardingSelector);
