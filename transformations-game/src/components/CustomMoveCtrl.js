import React, { useState } from "react";
import { AppContext } from "../context/app-context.js";
import "tachyons";

const CustomMoveCtrl = props => {
  const context = React.useContext(AppContext);

  const [translate, reflect, rotate] = props.movement;
  let [grabbed, setGrabbed] = useState(false);

  let onDragOver = ev => {
    ev.preventDefault();
    ev.target.style.cursor = "grabbing";
    if (grabbed === false) {
      setGrabbed(true);
    } else return;
  };

  let onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  let onDrop = (ev, category) => {
    let moveKey = Number(ev.dataTransfer.getData("id"));
    props.moves.filter(move => {
      if (move.id === moveKey) {
        move.category = category;
        if (move.category === "staged" && move.moveType === "reflect") {
          reflect(props.destination, move.reflectX, move.reflectY, move.cre);
          context.setCurrentScore(context.currentScore - 1000);
        }
        if (move.category === "staged" && move.moveType === "translate") {
          translate(props.destination, move.ixt, move.iyt);
          context.setCurrentScore(context.currentScore - 1000);
        }
        if (move.category === "staged" && move.moveType === "rotate") {
          rotate(props.destination, move.ixro, move.iyro, move.rotateFactor);
          context.setCurrentScore(context.currentScore - 1000);
        }
      }
      setGrabbed(false);
    });
  };

  let displayMoves = {
    preStage: [],
    staged: []
  };
  props.moves.forEach(t => {
    displayMoves[t.category].push(
      <div
        key={t.id}
        onDragStart={
          t.category === "staged" || props.moving === true
            ? null
            : e => onDragStart(e, t.id)
        }
        draggable
        className={"draggable " + t.style + " tc f5 pa0"}
        style={{
          backgroundColor:
            t.style === "translate"
              ? props.moveColour.translate
              : t.style === "rotate-counter" || t.style === "rotate-clock"
              ? props.moveColour.rotate
              : t.style === "reflect-x" || t.style === "reflect-y"
              ? props.moveColour.reflect
              : ""
        }}
      >
        <span className="move-text" style={{ color: props.moveColour.text }}>
          {t.name}
        </span>
      </div>
    );
  });

  return (
    <div>
      <div
        className="top-container"
        style={{ backgroundColor: props.topBackground }}
      >
        <h2
          className="tc f3 pa0"
          style={{ fontFamily: props.font.type, color: props.font.color }}
        >
          Please Select A Move
        </h2>
        <span
          className="move-header"
          style={{ fontFamily: props.font.type, color: props.font.color }}
        >
          Moves:
        </span>
        <div
          className="preStage"
          onDragOver={e => onDragOver(e)}
          onDrop={e => {
            onDrop(e, "preStage");
          }}
        >
          {displayMoves.preStage}
        </div>
      </div>
      <div
        className="bottom-container"
        style={{ backgroundColor: props.botBackground }}
      >
        <span
          className="move-header"
          style={{ fontFamily: props.font.type, color: props.font.color }}
        >
          Drop Here:
        </span>
        <div
          className={"droppable " + (grabbed === true ? "drop-area" : null)}
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e, "staged")}
        >
          {displayMoves.staged}
        </div>
      </div>
      <div className="middle-container">
        <button className="reset-button" onClick={() => props.handleRestart()}>
          Reset Level
        </button>
      </div>
    </div>
  );
};

export default CustomMoveCtrl;

// Line 22
// let selectedMove =

// Line 38
// let updatedMoves = [...props.moves]; //copy old array data

// for (let item of updatedMoves) {
//   if (item.name === selectedMove.name) {
//     item = selectedMove;
//   }
// }
// props.setMoves(updatedMoves);
