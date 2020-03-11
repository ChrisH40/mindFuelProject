import React, { useState } from 'react';
import AppRouter from './AppRouter';

export const AppContext = React.createContext();

export const ContextProvider = () => {
    const [instanceKey, setInstanceKey] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
 
    return (
        <AppContext.Provider
        value={{
            currentLevel: currentLevel,
            setCurrentLevel: setCurrentLevel,
            instanceKey: instanceKey,
            setInstanceKey: setInstanceKey,
        }}
        >
            <AppRouter key={instanceKey}/>
        </AppContext.Provider>
    )
};