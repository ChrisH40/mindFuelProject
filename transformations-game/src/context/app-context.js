import React, { useState, useEffect } from "react";
import { database } from "../firebase/firebase";

export const AppContext = React.createContext();

export const ContextProvider = props => {
  const [instanceKey, setInstanceKey] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [currentScore, setCurrentScore] = useState(20000);
  const [user, setUser] = useState(null);

  // store user data onto database
  useEffect(() => {
    if (user) {
      database
        .ref(`users/${user}`)
        .set({ currentLevel, currentAttempts, currentScore });
    }
  });

  const state = {
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
  };

  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { key: instanceKey })
  );

  return (
    <AppContext.Provider value={state}>{childrenWithProps}</AppContext.Provider>
  );
};
