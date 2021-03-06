import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import HomePage from "../../components/Drivers/HomePage";

function DriversView(props) {
  return (
    <>
      <HomePage
        user={props.user}
        usrUpdate={props.usrUpdate}
        refreshUserData={props.refreshUserData}
        usrLoading={props.usrLoading}
      />
    </>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  usrLoading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    usrUpdate: (user, data) => dispatch(actions.auth.initUsrUpdate(user, data)),
    refreshUserData: user => dispatch(actions.auth.initOauth(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversView);
