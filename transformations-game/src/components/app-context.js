import React, { useState } from 'react';
import App from '../App.js';

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
            <App key={instanceKey}/>
        </AppContext.Provider>
    )
};