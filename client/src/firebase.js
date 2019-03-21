import firebase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "birth-ride.firebaseapp.com",
    databaseURL: "https://birth-ride.firebaseio.com",
    projectId: "birth-ride",
    storageBucket: "birth-ride.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId
  };
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;