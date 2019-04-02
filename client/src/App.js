import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase , { messaging } from "./firebase";
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
import { Button } from "@material-ui/core";
import OnNotification from "./components/OnNotification/OnNotification";

class App extends Component {
  setTwilio = () => {
<<<<<<< HEAD
    axios.get('/api/twilio/text-me')
  }
  requestPushNotificationsPermission = () => {
    messaging.requestPermission().then((result) => {
      return messaging.getToken();
    }).then(token => {
      return axios.post('/api/users/notifications', {token});
    }).catch(err => {
      console.error(err.message);
      return axios.post('/api/users/notifications', {token: false});
    })
  }
=======
    axios.get("/api/twilio/text-me");
  };
>>>>>>> master
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
<<<<<<< HEAD
    if (this.props.user.ftoken) {
      const userType = this.props.user.user_type;
=======
    if (this.props.authenticated) {
      const userType = this.props.user.user_type;
      console.log("You are Authenticated! user_type: ", userType);
>>>>>>> master
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          {userType === "drivers" && <Redirect from="/" exact to="/drivers" />}
          {userType === "drivers" && (
            <Redirect from="/onboarding" exact to="/drivers" />
          )}
          {userType === "mothers" && <Redirect from="/" exact to="/mothers" />}
          {userType === "mothers" && (
            <Redirect from="/onboarding" exact to="/mothers" />
          )}
          <Route path="/onboarding" component={OnboardingView} />
          {!userType && <Redirect exact to="/onboarding" />}
          <Route path="/drivers" component={DriversView} />
          <Route path="/mothers" component={MothersView} />
          <Route path="/destination" component={DestinationMap} />
          <Route path="/location" component={OriginMap} />
<<<<<<< HEAD
=======
          <Route path="/newride" component={RequestRideView} />
          <Redirect to="/" />
>>>>>>> master
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
        <Button onClick={this.requestPushNotificationsPermission}>Sign Up for Push Notifications</Button>
        <OnNotification />
      </div>
    );
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, ra } = user;
        if (user.email) {
          const { email } = user;
          this.props.onAutoSignIn({ firebase_id: uid, email, ftoken: ra });
        } else {
          const { phoneNumber } = user;
          this.props.onAutoSignIn({ firebase_id: uid, phoneNumber, ftoken: ra });
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
