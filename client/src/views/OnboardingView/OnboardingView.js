import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import OnboardingSelector from "../../components/OnboardingComponents/OnboardingSelector.js";
import MotherForm from "../../components/Forms/onBoardingForms/MotherForm";
import DriverForm from "../../components/Forms/onBoardingForms/DriverForm";
import CareGiversForm from "../../components/Forms/onBoardingForms/CareGiverForm";

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
      return (
        <OnboardingSelector
          setUserType={this.setUserTypeHandler}
          redir={this.props.redir}
        />
      );
    }
    if (this.state.userType === "mothers") {
      return (
        <MotherForm
          user={this.props.user}
          onSubmitForm={this.props.onSubmitForm}
          redirOnSuccess={this.props.redir}
        />
      );
    }
    if (this.state.userType === "drivers") {
      return (
        <DriverForm
          user={this.props.user}
          onSubmitForm={this.props.onSubmitForm}
          redirOnSuccess={this.props.redir}
        />
      );
    }
    if (this.state.userType === "caregivers") {
      return (
        <CareGiversForm
          user={this.props.user}
          onSubmitForm={this.props.onSubmitForm}
          redirOnSuccess={this.props.redir}
        />
      );
    }
    return <p>Some thing went wrong...</p>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegisteringUser: state.isRegisteringUser // delete this?
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: (user, formValues) =>
      dispatch(actions.auth.initOnbrd(user, formValues))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingView);
