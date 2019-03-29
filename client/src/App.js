import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from './firebase';
import actions from './store/actions';

import RegisterView from "./views/AuthenticationView/RegisterView";
import OnboardingView from "./views/OnboardingView/OnboardingView";
import OriginMap from './components/GoogleMaps/OriginMap/OriginMap';

import "./App.css";
import Logout from "./views/AuthenticationView/Logout";

class App extends Component {
  render() {
    let routes = (
      <>
        <Route path="/" exact component={RegisterView} />
        <Route
          path="/something-else"
          render={() => <div>This is unprotected</div>}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/onboarding" component={OnboardingView} />
      </>
    );
    if (this.props.authenticated) {
      console.log('You are Authenticated!')
      // routes = (
      //   <>
      //     <Route path="/" exact render={() => <div>This is protected</div>} />
      //     <Route
      //       path="/something-else"
      //       render={() => <div>This is protected</div>}
      //     />
      //   </>
      // );
    }

    return (
      <div className="App">
        <button type="button" onClick={() => {this.props.history.push('/logout')}}>Logout</button>
        <Switch>
          {routes}
          <Redirect to="/" exact />
        </Switch>
        <OriginMap />
      </div>
    );
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, ra } = user;
        if (user.email) {
          const { email } = user;
          this.props.onAutoSignIn({ fireBId: uid, email, fireBtoken: ra })
        } else {
          const { phoneNumber } = user;
          this.props.onAutoSignIn({ fireBId: uid, phoneNumber, fireBtoken: ra })
        }
      } else {
        console.log('Not Authenticated')
      }
    })
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.user.fireBtoken !== null && state.auth.user.fireBtoken !== undefined,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: (user) => dispatch(actions.auth.autoSignIn(user)) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
