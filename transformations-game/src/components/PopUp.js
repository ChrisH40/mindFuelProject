import React from "react";
import { GameContext } from "../game context/context.js";

export const PopUp = (props) => {
    const context = React.useContext(GameContext);

    const handleNextLevel = () => {
        context.setCurrentAttempts(1);
        context.setCurrentScore(20000);
        context.setCurrentLevel(context.currentLevel + 1);
        context.setInstanceKey(context.instanceKey + 1);
      };

    return (
    <div className="popup">
      <div
        className="popup_inner"
        style={{ fontFamily: props.level.theme.font.type }}
      >
        <h1 className={props.win === true ? "win-font" : "lose-font"}>
          {props.win === true
            ? props.level.popUpMessages[0]
            : props.lose === 1
            ? props.level.popUpMessages[1]
            : props.level.popUpMessages[2]}
        </h1>
        <button className="restart-button" onClick={() => props.handleRestart()}>
          Play Again?
        </button>
        {props.win === true && context.currentLevel + 1 < props.levels.length ? (
          <button
            className="next-level-button"
            onClick={() => handleNextLevel()}
          >
            {" "}
            Next Level!{" "}
          </button>
        ) : null}
      </div>
    </div>
  );
}
