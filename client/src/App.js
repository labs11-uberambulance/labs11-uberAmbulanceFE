import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AuthenticationView from './views/AuthenticationView/AuthenticationView'
import "./App.css";

import OnboardingView from "./views/OnboardingView/OnboardingView";

class App extends Component {
  render() {
    let routes = (
      <>
        <Route path="/" exact component={AuthenticationView} />
        <Route
          path="/something-else"
          render={() => <div>This is unprotected</div>}
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
        <Route exact path="/onboarding" component={OnboardingView} />
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
      state.auth.user.token !== null && state.auth.user.token !== undefined
  };
};

export default withRouter(connect(mapStateToProps)(App));
