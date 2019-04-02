import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const onboardingSelector = props => (
  <Grid container direction="column">
    <Button
      value="DRIVER"
      onClick={() => props.setUserType("drivers")}
      color="primary"
    >
      DRIVER
    </Button>
    <Button
      value="PREGNANT MOTHER"
      onClick={() => props.setUserType("mothers")}
      color="primary"
    >
      PREGNANT MOTHER
    </Button>
    <Button
      value="CAREGIVER"
      onClick={() => props.setUserType("caregivers")}
      color="primary"
    >
      CAREGIVER
    </Button>
  </Grid>
);

export default onboardingSelector;
