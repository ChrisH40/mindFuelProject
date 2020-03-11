import * as firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyD0-XnOaPSNIEoMR71BvpmAsI0Q0tq6xIE",
    authDomain: "transformation-game.firebaseapp.com",
    databaseURL: "https://transformation-game.firebaseio.com",
    projectId: "transformation-game",
    storageBucket: "transformation-game.appspot.com",
    messagingSenderId: "284410010112",
    appId: "1:284410010112:web:07bae1c8c6110e809ad6e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()

  database.ref().set({
      name: "team neptune"
  })