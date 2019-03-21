import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "./axios-instance";

import { setUserType } from "./store/actions/userActions.js";

import RegisterView from "./views/AuthenticationView/RegisterView";

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
        <Route path="/onboarding" component={OnboardingView} />
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
  componentDidMount() {
    axios
      .get("")
      .then(result => {
        console.log("axios get test: ", result.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

const mapStateToProps = state => {
  return {
    authenticated:
      state.auth.user.token !== null && state.auth.user.token !== undefined
  };
};

export default withRouter(connect(mapStateToProps)(App));
