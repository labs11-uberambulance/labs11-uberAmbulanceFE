import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import OnboardingView from "./views/OnboardingView/OnboardingView";

class App extends Component {
  render() {
    return (
      <div className="App">
        Client
        <Route exact path="/onboarding" component={OnboardingView} />
      </div>
    );
  }
}

export default App;
