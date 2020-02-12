import React, { useState } from "react";
import "tachyons";

const CustomMoveCtrl = props => {
  const [translate, reflect, rotate] = props.movement;
  let [grabbed, setGrabbed] = useState(false);

  let onDragOver = ev => {
    ev.preventDefault();
    ev.target.style.cursor = "grabbing";
    if (grabbed === false) {
      setGrabbed(true)
    } else return;
  };

  let onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  let onDrop = (ev, category) => {
    let moveKey = Number(ev.dataTransfer.getData("id"));
    // let selectedMove = 
    props.moves.filter(move => {
      if (move.id === moveKey) {
        move.category = category;
        if (move.category === "staged" && move.moveType === "reflect") {
          reflect(props.triangleCoords, move.reflectX, move.reflectY, move.cre);
        }
        if (move.category === "staged" && move.moveType === "translate") {
          translate(props.triangleCoords, move.ixt, move.iyt);
        }
        if (move.category === "staged" && move.moveType === "rotate") {
          rotate(props.triangleCoords, move.ixro, move.iyro, move.rotateFactor);
        }
      }
      setGrabbed(false);
    });
    // let updatedMoves = [...props.moves]; //copy old array data

    // for (let item of updatedMoves) {
    //   if (item.name === selectedMove.name) {
    //     item = selectedMove;
    //   }
    // }
    // props.setMoves(updatedMoves);
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
          t.category === "staged" || props.moving === true ? null : e => onDragStart(e, t.id)
        }
        draggable
        className={"draggable " + t.style + " tc f5 pa0"}
      >
        <span className="move-text">{t.name}</span>
      </div>
    );
  });

  return (
    <div>
      <div className="top-container">
        <h2 className="tc f3 pa0">Please Select A Move</h2>
        <span className="move-header">Moves:</span>
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
      <div className="bottom-container">
        <span className="move-header">Drop Here:</span>
        <div
          className={"droppable " + (grabbed === true ? "drop-area" : null)}
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e, "staged")}
        >
          {displayMoves.staged}
        </div>
      </div>
    </div>
  );
};

export default CustomMoveCtrl;