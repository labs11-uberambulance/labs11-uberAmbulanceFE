import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./firebase";
import actions from "./store/actions";
import { messaging } from './firebase';
import RegisterView from "./views/AuthenticationView/RegisterView";
import OnboardingView from "./views/OnboardingView/OnboardingView";
import DriversView from "./views/DriversView/DriversView";
import MothersView from "./views/MothersView/MothersView";
import RequestRideView from "./views/RequestRideView/RequestRideView";
import LandingView from './views/LandingView/LandingView';
import Logout from "./views/AuthenticationView/Logout";
import OnNotification from "./components/OnNotification/OnNotification";
import "./App.css";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={LandingView} />
        <Route path={["/register", "/login"]} component={RegisterView} />
        <Redirect to="/" />
      </Switch>
    );
    console.log(this.props.user)
    if (this.props.user.ftoken) {
      const userType = this.props.user.user_type;
      console.log(this.props.user.user_type)
      routes = (
        <Switch>
          <Route path="/onboarding" component={OnboardingView} />
          {!userType && <Redirect exact to="/onboarding" />}
          <Route path="/drivers" component={DriversView} />
          <Route path="/mothers" component={MothersView} />
          <Route path="/newride" component={RequestRideView} />
          <Route path="/logout" component={Logout} />
          { userType === "drivers" && <Redirect to="/drivers" />}
          { userType === "mothers" && <Redirect to="/mothers" />}
        </Switch>
      );
    }

    return (
      <div className="App">
        {routes}
        {messaging && <OnNotification />}
      </div>
    );
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, ra } = user;
        if (user.email) {
          const { email } = user;
          this.props.onAutoSignIn({ firebase_id: uid, email, ftoken: ra });
        } else {
          const { phoneNumber } = user;
          this.props.onAutoSignIn({
            firebase_id: uid,
            phoneNumber,
            ftoken: ra
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
