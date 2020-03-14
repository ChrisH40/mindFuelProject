import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import AppRouter from "./routers/AppRouter";
import { ContextProvider, AppContext } from "./context/app-context.js";

ReactDOM.render(
  <ContextProvider>
    <AppContext.Consumer>
      <AppRouter />
    </AppContext.Consumer>
  </ContextProvider>,
  document.getElementById("root")
);

// <ContextProvider><AppContext.Consumer><AppRouter /></AppContext.Consumer></ContextProvider>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
