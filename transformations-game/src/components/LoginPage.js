import React from "react";
import { history } from "../routers/AppRouter";

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
      <button>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
