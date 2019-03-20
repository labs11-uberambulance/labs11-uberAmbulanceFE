import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function OnboardingSelector(props) {
  return (
    <Grid container direction="column" maxWidth="20vw">
      <Button
        value="DRIVER"
        onClick={() => props.history.push("/onboarding/driver")}
        color="primary"
      >
        DRIVER
      </Button>
      <Button
        value="PREGNANT MOTHER"
        onClick={() => props.history.push("/onboarding/mother")}
        color="primary"
      >
        PREGNANT MOTHER
      </Button>
      <Button
        value="CAREGIVER"
        onClick={() => props.history.push("/onboarding/caregiver")}
        color="primary"
      >
        CAREGIVER
      </Button>
    </Grid>
  );
}

export default withRouter(OnboardingSelector);
