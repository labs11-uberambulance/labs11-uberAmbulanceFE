import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { setUserType } from "./store/actions/userActions.js";

import AuthenticationView from "./views/AuthenticationView/AuthenticationView";
import RegisterView from './views/AuthenticationView/RegisterView'

import "./App.css";

import OnboardingView from "./views/OnboardingView/OnboardingView";

class App extends Component {
  render() {
    let routes = (
      <>
        <Route path="/" exact component={RegisterView} />
        <Route
          path="/something-else"
          render={() => <div>This is unprotected</div>}
        />
        <Route
          path="/onboarding"
          render={() => (
            <OnboardingView
              userType={this.props.userType}
              setUserType={this.props.setUserType}
            />
          )}
        />
      </>
    );
    if (this.props.authenticated) {
      routes = (
        <>
          <Route path="/" exact render={() => <div>This is protected</div>} />
          <Route
            path="/something-else"
            render={() => <div>This is protected</div>}
          />
        </>
      );
    }

    return (
      <div className="App">
        <Switch>
          {routes}
          <Redirect to="/" exact />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated:
      state.auth.user.token !== null && state.auth.user.token !== undefined,
    userType: state.auth.user.type
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      setUserType
    }
  )(App)
);
