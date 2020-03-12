import React, { useState } from "react";
import "tachyons";
import { AppContext } from '../components/app-context.js';

const TopMenu = props => {
    const context = React.useContext(AppContext);

    return (
        <div className="top-menu" style={{ fontFamily: props.font.type, color: props.font.color, backgroundColor: props.menuBackground }}>
            <span className="lvl-title">"{props.title}"</span>
            <span className="lvl-user">User: "Guest"</span>
            <span className="lvl-current">Current Level: {context.currentLevel}</span>
            <span className="lvl-score">"Current Score: 1"</span>
            <span className="lvl-attempts">Attempts: {context.currentAttempts}</span>
        </div>
    )
};

export default TopMenu;