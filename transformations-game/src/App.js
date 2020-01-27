import React, { useState } from "react";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./components/settings";
import LevelOne from "./components/LevelOne";
import CustomMoveCtrl from "./components/CustomMoveCtrl";
import m, { mapToGameCoords } from "./components/moveUtil";

const App = () => {
  // initial position
  const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];

  // winning position
  const target = { x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 };

  let [coords, setCoords] = useState(initTriangleShape(x1, y1));
  let [win, setWin] = useState(false);


  const translate = (triangleCoords, xUnit, yUnit) => {
    let transformedCoords = m.translate(triangleCoords, xUnit, yUnit);
    setCoords(coords = transformedCoords);
    winCheck(transformedCoords, target);
  };

  const rotate = (triangleCoords, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(triangleCoords, xUnit, yUnit, deg);
    setCoords(coords = transformedCoords);
    winCheck(transformedCoords, target);
  };

  const reflect = (triangleCoords, a, b, c) => {
    let transformedCoords = m.reflect(triangleCoords, a, b, c);
    setCoords(coords = transformedCoords);
    winCheck(transformedCoords, target);
  };

  const winCheck = (tri, exit) => {
    tri = mapToGameCoords(tri)
    if (JSON.stringify(tri) === JSON.stringify(exit)) {
      setWin(true);
    }
    else return;
  }

  return (
    <div className="App">
      <div className="Canvas">
        <LevelOne
          triangleCoords={coords} />
      </div>
      <div className="right-container">
        <CustomMoveCtrl
          triangleCoords={coords}
          movement={[translate, reflect, rotate]}
        />
      </div>
    </div>
  )
};

export default App