import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../../firebase";
import actions from "../../store/actions";

class Logout extends Component {
  componentDidMount() {
    firebase.auth().signOut();
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.auth.logout)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
