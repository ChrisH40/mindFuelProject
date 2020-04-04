import React, { useState, useEffect, useContext } from "react";
import {
  withAuthenticationProvider,
  withAuthenticationConsumer
} from "../session";

export const GameContext = React.createContext();

const GameContextProviderBase = props => {
  const initState = {
    currentLevel: 1,
    currentAttempts: 0,
    currentScore: 20000
  };

  // if user has saved game session from db, render that session
  if (props.authUser.gameState) {
    initState = props.authUser.gameState;
  }

  const [instanceKey, setInstanceKey] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(initState.currentLevel);
  const [currentAttempts, setCurrentAttempts] = useState(
    initState.currentAttempts
  );
  const [currentScore, setCurrentScore] = useState(initState.currentScore);

  const state = {
    currentLevel,
    setCurrentLevel,
    instanceKey,
    setInstanceKey,
    currentAttempts,
    setCurrentAttempts,
    currentScore,
    setCurrentScore
  };

  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { key: instanceKey })
  );

  return (
    <GameContext.Provider value={state}>
      {childrenWithProps}
    </GameContext.Provider>
  );
};

export const GameContextProvider = withAuthenticationProvider(
  withAuthenticationConsumer(GameContextProviderBase)
);

export const withGameContext = Component => props => (
  <GameContext.Consumer>
    {gameState => <Component {...props} gameState={gameState} />}
  </GameContext.Consumer>
);
