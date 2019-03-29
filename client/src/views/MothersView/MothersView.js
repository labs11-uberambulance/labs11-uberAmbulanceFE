import React from "react";
import { connect } from "react-redux";

function MothersView() {
  return <p>MothersView</p>;
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(MothersView);
