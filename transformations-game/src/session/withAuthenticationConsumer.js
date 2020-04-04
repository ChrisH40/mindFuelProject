import React from "react";
import AuthUserContext from "./context";

const withAuthenticationConsumer = Component => {
  const WithAuthenticationConsumer = props => (
    <AuthUserContext.Consumer>
      {authUser => <Component {...props} authUser={authUser} />}
    </AuthUserContext.Consumer>
  );
  return WithAuthenticationConsumer;
};

export default withAuthenticationConsumer;
