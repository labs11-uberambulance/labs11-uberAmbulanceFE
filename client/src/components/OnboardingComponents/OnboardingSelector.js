import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const onboardingSelector = (props) => (
  <Grid container direction="column">
    <Button onClick={() => props.setUserType("driver")} color="primary">DRIVER</Button>
    <Button onClick={() => props.setUserType("mother")} color="primary">PREGNANT MOTHER</Button>
    <Button onClick={() => props.setUserType("caregiver")} color="primary">CAREGIVER</Button>
  </Grid>
);

export default onboardingSelector;
