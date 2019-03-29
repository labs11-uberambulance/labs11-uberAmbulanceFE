import React from "react";
import { connect } from "react-redux";

function DriversView() {
  return <p>DriversView</p>;
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(DriversView);
