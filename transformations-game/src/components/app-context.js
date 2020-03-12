import React, { useState } from 'react';
import AppRouter from './AppRouter';

export const AppContext = React.createContext();

export const ContextProvider = () => {
    const [instanceKey, setInstanceKey] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(2);
    const [currentAttempts, setCurrentAttempts] = useState(0);
    const [currentScore, setCurrentScore] = useState(20000);




    return (
        <AppContext.Provider
        value={{
            currentLevel: currentLevel,
            setCurrentLevel: setCurrentLevel,
            instanceKey: instanceKey,
            setInstanceKey: setInstanceKey,
            currentAttempts: currentAttempts,
            setCurrentAttempts: setCurrentAttempts,
            currentScore: currentScore,
            setCurrentScore: setCurrentScore,
        }}
        >
            <AppRouter key={instanceKey}/>
        </AppContext.Provider>
    )
};