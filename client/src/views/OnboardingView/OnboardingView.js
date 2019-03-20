import React from "react";
import { Route, withRouter } from "react-router-dom";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingDriver from "../../components/OnboardingComponents/OnboardingDriver.js";
import OnboardingMother from "../../components/OnboardingComponents/OnboardingMother.js";
import OnboardingCaregiver from "../../components/OnboardingComponents/OnboardingCaregiver.js";

function OnboardingView({ match }) {
  return (
    <>
      <Route exact path={`${match.path}/`} component={OnboardingSelector} />
      <Route exact path={`${match.path}/driver`} component={OnboardingDriver} />
      <Route exact path={`${match.path}/mother`} component={OnboardingMother} />
      <Route
        exact
        path={`${match.path}/caregiver`}
        component={OnboardingCaregiver}
      />
    </>
  );
}

export default withRouter(OnboardingView);
