import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "./firebase";
import actions from "./store/actions";
import axios from "./axios-instance";
import RegisterView from "./views/AuthenticationView/RegisterView";
import OnboardingView from "./views/OnboardingView/OnboardingView";
import DriversView from "./views/DriversView/DriversView";
import MothersView from "./views/MothersView/MothersView";
import RequestRideView from "./views/RequestRideView/RequestRideView";
import DestinationMap from "./components/GoogleMaps/DestinationMap/DestinationMap";
import OriginMap from "./components/GoogleMaps/OriginMap/OriginMap";

import "./App.css";
import Logout from "./views/AuthenticationView/Logout";

class App extends Component {
  setTwilio = () => {
    axios.get("/api/twilio/text-me");
  };
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={RegisterView} />
        <Route path="/logout" component={Logout} />
        <Route path="/onboarding" component={OnboardingView} />
        <Route path="/drivers" component={DriversView} />
        <Route path="/mothers" component={MothersView} />
        <Route path="/destination" component={DestinationMap} />
        <Route path="/location" component={OriginMap} />
        <Route path="/newride" component={RequestRideView} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.authenticated) {
      const userType = this.props.user.user_type;
      console.log("You are Authenticated! user_type: ", userType);
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          {!userType && <Redirect from="/" exact to="/onboarding" />}
          {userType === "drivers" && <Redirect from="/" exact to="/drivers" />}
          {userType === "drivers" && (
            <Redirect from="/onboarding" exact to="/drivers" />
          )}
          {userType === "mothers" && <Redirect from="/" exact to="/mothers" />}
          {userType === "mothers" && (
            <Redirect from="/onboarding" exact to="/mothers" />
          )}
          <Route path="/onboarding" component={OnboardingView} />
          <Route path="/drivers" component={DriversView} />
          <Route path="/mothers" component={MothersView} />
          <Route path="/destination" component={DestinationMap} />
          <Route path="/location" component={OriginMap} />
          <Route path="/newride" component={RequestRideView} />
          <Redirect to="/" />
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
        <button onClick={this.setTwilio}>Get Twilio Updates</button>
      </div>
    );
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("CDM App.js", user);
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
        // this.props.onLogout();
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
    onAutoSignIn: user => dispatch(actions.auth.initOauth(user)),
    onLogout: () => dispatch(actions.auth.logout)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
