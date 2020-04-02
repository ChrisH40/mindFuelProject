import React, { useState, useEffect, useContext } from "react";

export const GameContext = React.createContext();

export const GameContextProvider = props => {
  const [instanceKey, setInstanceKey] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [currentScore, setCurrentScore] = useState(20000);

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

export const withGameContext = Component => props => (
  <GameContext.Consumer>
    {gameState => <Component {...props} gameState={gameState} />}
  </GameContext.Consumer>
);
