import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import OnboardingView from "./views/OnboardingView/OnboardingView";

class App extends Component {
  render() {
    let routes = (
      <>
        <Route path="/" exact render={() => <div>This is unprotected</div>} />
        <Route
          path="/something-else"
          render={() => <div>This is unprotected</div>}
        />
        <Route
          path="/onboarding"
          component={OnboardingView}
          userType={this.props.userType}
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
        Client
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

export default withRouter(connect(mapStateToProps)(App));
