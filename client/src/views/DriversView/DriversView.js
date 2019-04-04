import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import HomePage from "../../components/Drivers/HomePage";

function DriversView(props) {
  console.log("DriverView ", props.user);
  return <HomePage user={props.user} usrUpdate={props.usrUpdate} />;
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
    usrUpdate: (user, data) => dispatch(actions.auth.initUsrUpdate(user, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversView);
