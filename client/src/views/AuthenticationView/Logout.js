import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';

class Logout extends Component {

    componentDidMount() {
        firebase.auth().signOut();
    }

  render() {
    return <Redirect to="/" />
  }
}


export default Logout;
