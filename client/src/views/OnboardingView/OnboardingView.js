import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../../store/actions/userActions";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import OnboardingForm from "../../components/Forms/OnboardingForm.js";

class OnboardingView extends Component {
  state = {
    userType: null
  };
  setUserTypeHandler = type => {
    this.setState({ userType: type });
  };
  returnToSelectorHandler = () => {
    this.setState({ userType: null });
  };
  render() {
    if (!this.state.userType) {
      return <OnboardingSelector setUserType={this.setUserTypeHandler} />;
    }
    console.log(this.state.userType)
    return (
      <OnboardingForm
        userType={this.state.userType}
        goBack={this.returnToSelectorHandler}
        registerUser={this.props.registerUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  { registerUser }
)(OnboardingView);
