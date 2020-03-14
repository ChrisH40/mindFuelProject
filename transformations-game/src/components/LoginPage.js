import React from "react";
import { history } from "../routers/AppRouter";
import { startLogin } from "../utils/auth";

const LoginPage = props => {
  return (
    <div>
      <h1>Game Title Placeholder</h1>
      <p>Game description placeholder</p>
      <button
        onClick={() => {
          history.push("/game");
        }}
      >
        Play as a Guest
      </button>
      <button onClick={startLogin}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
