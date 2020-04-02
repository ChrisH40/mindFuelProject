import * as firebase from "firebase";
import React from "react";

const FirebaseContext = React.createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyD0-XnOaPSNIEoMR71BvpmAsI0Q0tq6xIE",
  authDomain: "transformation-game.firebaseapp.com",
  databaseURL: "https://transformation-game.firebaseio.com",
  projectId: "transformation-game",
  storageBucket: "transformation-game.appspot.com",
  messagingSenderId: "284410010112",
  appId: "1:284410010112:web:07bae1c8c6110e809ad6e5"
};

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  /** Auth API */
  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  /** User API */
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref(`users`);

  /** Merge auth and DB user API */
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
