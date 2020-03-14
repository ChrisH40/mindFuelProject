import React, { useState } from "react";
import AppRouter from "../routers/AppRouter";

export const AppContext = React.createContext();

export const ContextProvider = () => {
  const [instanceKey, setInstanceKey] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [currentScore, setCurrentScore] = useState(20000);
  const [user, setUser] = useState(null);
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

  return (
    <AppContext.Provider value={state}>
      <AppRouter key={instanceKey} />
    </AppContext.Provider>
  );
};
