import React from "react";
import { connect } from "react-redux";




function MothersView() {
  return (<>
  <p>MothersView</p>
  <button >Request a ride</button>
  </>)
}

const mapStateToProps = state => ({
  user: state.user,
  isRegisteringUser: state.isRegisteringUser
});

export default connect(
  mapStateToProps,
  {}
)(MothersView);
