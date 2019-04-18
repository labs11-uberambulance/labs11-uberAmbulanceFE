import React, { Component, lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./firebase";
import actions from "./store/actions";
import { messaging } from "./firebase";
import RegisterView from "./views/AuthenticationView/RegisterView";
import RequestRideView from "./views/RequestRideView/RequestRideView";
import LandingView from "./views/LandingView/LandingView";
import Logout from "./views/AuthenticationView/Logout";
import OnNotification from "./components/OnNotification/OnNotification";
import "./App.css";
const DriversView = lazy(() => import("./views/DriversView/DriversView"))
const MothersView = lazy(() => import("./views/MothersView/MothersView"));
const OnboardingView = lazy(() => import("./views/OnboardingView/OnboardingView"));

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={LandingView} />
        <Route path={["/register", "/login"]} component={RegisterView} />
        <Redirect to="/" />
      </Switch>
    );
    console.log(this.props.user);
    if (this.props.user.ftoken) {
      const userType = this.props.user.user_type;
      // console.log(this.props.user.user_type);
      routes = (
        <Switch>
          <Route path="/onboarding" component={OnboardingView} />
          <Route path="/logout" component={Logout} />
          {!userType && <Redirect exact to="/onboarding" />}
          <Route path="/drivers" component={DriversView} />
          <Route path="/mothers" component={MothersView} />
          <Route path="/newride" component={RequestRideView} />
          {userType === "drivers" && <Redirect to="/drivers" />}
          {userType === "mothers" && <Redirect to="/mothers" />}
        </Switch>
      );
    }

    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
        {messaging && (
          <OnNotification
            user={this.props.user}
            usrUpdate={this.props.onAutoSignIn}
          />
        )}
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
