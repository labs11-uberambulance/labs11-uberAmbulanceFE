import React from "react";
import { Route, withRouter } from "react-router-dom";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingDriver from "../../components/OnboardingComponents/OnboardingDriver.js";
import OnboardingMother from "../../components/OnboardingComponents/OnboardingMother.js";
import OnboardingCaregiver from "../../components/OnboardingComponents/OnboardingCaregiver.js";

function OnboardingView(props) {
  return (
    <>
      <Route
        exact
        path={`${props.match.path}/`}
        render={() => <OnboardingSelector setUserType={props.setUserType} />}
      />
      <Route
        exact
        path={`${props.match.path}/driver`}
        component={OnboardingDriver}
      />
      <Route
        exact
        path={`${props.match.path}/mother`}
        component={OnboardingMother}
      />
      <Route
        exact
        path={`${props.match.path}/caregiver`}
        component={OnboardingCaregiver}
      />
    </>
  );
}

export default withRouter(OnboardingView);
