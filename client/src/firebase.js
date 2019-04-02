import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/storage"
import "firebase/messaging";

const sendTokenToServer = (token) => fetch('/api/users/notifications', { method: 'POST', body: {token} });

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
export const messaging = firebase.messaging();
messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshToken) => {
      console.log('refreshToken', refreshToken)
        return sendTokenToServer(refreshToken)
    }).catch((err) => {
        console.log(err);
    })
})
export default firebase;