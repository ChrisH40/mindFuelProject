import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "./serviceWorker";
import "./index.css";
import AppRouter from "./routers/AppRouter";
import Firebase, { FirebaseContext } from "./firebase";
import { GameContextProvider } from "./game context/context";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <GameContextProvider>
      <AppRouter />
    </GameContextProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
