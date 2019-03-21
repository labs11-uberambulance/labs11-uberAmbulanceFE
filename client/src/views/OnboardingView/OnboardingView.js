import React, { Component } from "react";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingForm from "../../components/Forms/OnboardingForm.js";

class  OnboardingView extends Component {
  state = {
    userType: null
  }
  setUserTypeHandler = (type) => {
    this.setState({ userType: type })
  }
  returnToSelectorHandler = () => {
    this.setState({ userType: null })
  }
  render() {
    if (!this.state.userType) {
      return <OnboardingSelector setUserType={this.setUserTypeHandler} />
    }
    return <OnboardingForm userType={this.state.userType} goBack={this.returnToSelectorHandler}/>
  }
}

export default OnboardingView;
