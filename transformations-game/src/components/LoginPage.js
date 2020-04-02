import React, { useState } from "react";
import { history } from "../routers/AppRouter";
import { withFirebase } from "../firebase";

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
      <SignInGoogle />
    </div>
  );
};

const SignInGoogleBase = ({ firebase }) => {
  const [error, setError] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    firebase
      .doSignInWithGoogle()
      .then(authUser => {
        // create user in firebase db
        return firebase.user(authUser.user.uid).set({
          username: authUser.user.displayName,
          email: authUser.user.email,
          roles: {}
        });
      })
      .then(() => {
        setError(null);
        history.push("/game");
      })
      .catch(error => setError(error));
  };

  return (
    <form onSubmit={onSubmit}>
      <button>Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export const SignInGoogle = withFirebase(SignInGoogleBase);

export default LoginPage;
