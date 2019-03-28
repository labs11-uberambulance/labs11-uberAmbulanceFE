import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "./firebase";
import actions from "./store/actions";

import RegisterView from "./views/AuthenticationView/RegisterView";
import OnboardingView from "./views/OnboardingView/OnboardingView";

import "./App.css";
import Logout from "./views/AuthenticationView/Logout";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={RegisterView} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.authenticated) {
      console.log("You are Authenticated!", this.props.user.user.user_type);
      routes = (
        <Switch>
          {!this.props.user.user.user_type && (
            <Redirect from="/" exact to="/onboarding" />
          )}
          {this.props.user.user.user_type && (
            <Redirect from="/" exact to="/onboarding" />
          )}
          {/* <Redirect to="/" /> */}
          <Route path="/onboarding" component={OnboardingView} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <button
          type="button"
          onClick={() => {
            this.props.history.push("/logout");
          }}
        >
          Logout
        </button>
        {routes}
      </div>
    );
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("HERE");
      if (user) {
        const { uid, ra } = user;
        if (user.email) {
          const { email } = user;
          this.props.onAutoSignIn({ fireBId: uid, email, fireBtoken: ra });
        } else {
          const { phoneNumber } = user;
          this.props.onAutoSignIn({
            fireBId: uid,
            phoneNumber,
            fireBtoken: ra
          });
        }
      } else {
        console.log("Not Authenticated");
      }
    });
  }
}

const mapStateToProps = state => {
  return {
    authenticated:
      state.auth.user.fireBtoken !== null &&
      state.auth.user.fireBtoken !== undefined,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: user => dispatch(actions.auth.initOauth(user))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
