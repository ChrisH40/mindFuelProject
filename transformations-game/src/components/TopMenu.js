import React, { useState } from "react";
import "tachyons";
import { GameContext } from "../game context/context.js";

const TopMenu = props => {
  const context = React.useContext(GameContext);

  return (
    <div
      className="top-menu"
      style={{
        fontFamily: props.font.type,
        color: props.font.color,
        backgroundColor: props.menuBackground
      }}
    >
      <span className="lvl-title">"{props.title}"</span>
      <span className="lvl-user">User: "Guest"</span>
      <span className="lvl-current">Level: {context.currentLevel}</span>
      <span className="lvl-score">Score: {context.currentScore}</span>
      <span className="lvl-attempts">Attempts: {context.currentAttempts}</span>
    </div>
  );
};

export default TopMenu;
