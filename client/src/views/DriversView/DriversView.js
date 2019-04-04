import React from "react";
import { connect } from "react-redux";

import HomePage from "../../components/Drivers/HomePage";

function DriversView() {
  return <HomePage />;
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(DriversView);
