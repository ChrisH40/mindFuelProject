import React, { useState } from "react";
import { SIZE, GRID_MARGIN, initTriangleShape } from "./components/settings";
import Canvas from "./components/Canvas";
import CustomMoveCtrl from "./components/CustomMoveCtrl";
import m, { mapToGameCoords } from "./components/moveUtil";

const App = () => {
  // --- This becomes part of Level Object/State/Array Package ---
  const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];
  const target = { x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 };
  let [coords, setCoords] = useState(initTriangleShape(x1, y1));
  let [moves, setMoves] = useState([
    { name: "Translate X Axis 5, Y Axis -3", category: "preStage", moveType: "translate", ixt: 5, iyt: -3, style: "translate" },
    { name: "Reflect Y Axis ", category: "preStage", moveType: "reflect", reflectX: 1, reflectY: 0, cre: 0, style: "reflect" },
    { name: "Translate X Axis 0, Y Axis -7", category: "preStage", moveType: "translate", ixt: 0, iyt: -7, style: "translate" },
    { name: "Rotate 180° Origin (0, 0) Clockwise", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: 180, style: "rotate" },
    { name: "Reflect X Axis ", category: "preStage", moveType: "reflect", reflectX: 0, reflectY: 1, cre: 0, style: "reflect" },
    { name: "Rotate 90° Origin (0, 0) Clockwise", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: -90, style: "rotate" },
    { name: "Translate X Axis 0, Y Axis -9", category: "preStage", moveType: "translate", ixt: 0, iyt: -9, style: "translate" },
  ]);
  let [win, setWin] = useState(false);
  let [lose, setLose] = useState(false);
  // --- ---

  const handleRestart = () => {
    window.location.reload(true);
  };

  const translate = (triangleCoords, xUnit, yUnit) => {
    let transformedCoords = m.translate(triangleCoords, xUnit, yUnit);
    setCoords(coords = transformedCoords);
    winLoseCheck(transformedCoords, target);
  };

  const rotate = (triangleCoords, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(triangleCoords, xUnit, yUnit, deg);
    setCoords(coords = transformedCoords);
    winLoseCheck(transformedCoords, target);
  };

  const reflect = (triangleCoords, a, b, c) => {
    let transformedCoords = m.reflect(triangleCoords, a, b, c);
    setCoords(coords = transformedCoords);
    winLoseCheck(transformedCoords, target);
  };

  const winLoseCheck = (tri, exit) => {
    tri = mapToGameCoords(tri)
    if (JSON.stringify(tri) === JSON.stringify(exit)) {
      setWin(true);
    }
    else {
      let movesLeft = moves.find(move => move.category === "preStage");
      if (movesLeft === undefined && win === false) {
        setLose(true);
      }
      else return;
    }
  };

  const PopUp = () => (
    <div className='popup'>
      <div className='popup_inner'>
        <h1 className={win === true ? "win-font" : "lose-font"}>{win === true ? "You Win!" : "You Ran Out Of Moves :("}</h1>
        <button className="restart-button" onClick={() => handleRestart()}>Play Again?</button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="Canvas">
        <div
          className="sans-serif"
          style={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
        >
          <Canvas
            triangleCoords={coords}
            target={target}
            width={SIZE + GRID_MARGIN * 2}
            win={win}
            lose={lose}
          />
        </div>
      </div>
      <div className="right-container">
        <CustomMoveCtrl
          triangleCoords={coords}
          movement={[translate, reflect, rotate]}
          moves={moves}
          setMoves={setMoves}
        />
      </div>
      <div>
        {win === true || lose === true ? <PopUp /> : null}
      </div>
    </div>
  )
};

export default App