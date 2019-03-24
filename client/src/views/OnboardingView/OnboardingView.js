import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../../store/actions/userActions";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import MotherForm from '../../components/Forms/onBoardingForms/MotherForm';
import DriverForm from '../../components/Forms/onBoardingForms/DriverForm';
import CareGiversForm from '../../components/Forms/onBoardingForms/CareGiverForm';

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
    if (this.state.userType === 'mothers') {
      return <MotherForm />
    }
    if (this.state.userType === 'drivers') {
      return <DriverForm />
    }
    if (this.state.userType === 'caregivers') {
      return <CareGiversForm />
    }
    return <p>Some thing went wrong...</p>
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
