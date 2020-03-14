import React from "react";
import { Router, Switch, Route } from "react-router";
import LoginPage from "../components/LoginPage";
import Game from "../components/Game";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const AppRouter = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route component={LoginPage} path="/" exact />
        <Route component={Game} path="/game" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
