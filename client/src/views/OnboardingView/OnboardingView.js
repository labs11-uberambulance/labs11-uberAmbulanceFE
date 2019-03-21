import React from "react";
import { Route, withRouter } from "react-router-dom";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingForm from "../../components/Forms/OnboardingForm.js";

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
        render={() => <OnboardingForm userType="driver" />}
      />
      <Route
        exact
        path={`${props.match.path}/mother`}
        render={() => <OnboardingForm userType="mother" />}
      />
      <Route
        exact
        path={`${props.match.path}/caregiver`}
        render={() => <OnboardingForm userType="caregiver" />}
      />
    </>
  );
}

export default withRouter(OnboardingView);
