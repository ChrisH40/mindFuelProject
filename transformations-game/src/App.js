import React from "react";
import AppRouter from "./routers/AppRouter";
import { AppContext } from "./context/app-context";
import { firebase, database } from "./firebase/firebase";
import { history } from "./routers/AppRouter";

const App = () => {
  const {
    currentLevel,
    setCurrentLevel,
    instanceKey,
    setInstanceKey,
    currentAttempts,
    setCurrentAttempts,
    currentScore,
    setCurrentScore,
    user,
    setUser
  } = React.useContext(AppContext);

  // let hasRendered = false;
  // const renderApp = () => {
  //   if (!hasRendered) {
  //     jsx = AppRouter;
  //     hasRendered = true;
  //   }
  // };

  firebase.auth().onAuthStateChanged(u => {
    if (u) {
      // store user info
      setUser(u.uid);
      // get user data from database
      database
        .ref(`users/${u.uid}`)
        .once("value")
        .then(snapshot => {
          const userData = snapshot.val();
          setCurrentLevel(userData["currentLevel"]);
          setCurrentAttempts(userData["currentAttempts"]);
          setCurrentScore(userData["currentScore"]);
        });

      // renderApp();
      if (history.location.pathname === "/") {
        history.push("/game");
      }
    } else {
      setUser(null);
      // renderApp();
      history.push("/");
    }
  });
  return <AppRouter />;
};

export default App;
