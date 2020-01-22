import React, { useState } from "react";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./components/settings";
import LevelOne from "./components/LevelOne";
import CustomMoveCtrl from "./components/CustomMoveCtrl";
import m from "./components/moveUtil";

const App = () => {
  // initial position
  const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];

  let [coords, setCoords] = useState(initTriangleShape(x1, y1));
  // const state = { dead: false, won: false };

  const translate = (triangleCoords, xUnit, yUnit) => {
    let transformedCoords = m.translate(triangleCoords, xUnit, yUnit);
    setCoords(coords = transformedCoords);
  };

  const rotate = (triangleCoords, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(triangleCoords, xUnit, yUnit, deg);
    setCoords(coords = transformedCoords);
  };

  const reflect = (triangleCoords, a, b, c) => {
    let transformedCoords = m.reflect(triangleCoords, a, b, c);
    setCoords(coords = transformedCoords);
  };

  return (
    <div className="App">
      <div className="Canvas">
        <LevelOne
          triangleCoords={coords} />
      </div>
      <div className="right-container">
        <div className="top-container">
          <CustomMoveCtrl
            triangleCoords={coords}
            movement={[translate, reflect, rotate]}
          />
        </div>
        <div className="bottom-container">
          Bottom Menu
        </div>
      </div>
    </div>
  )
};

export default App