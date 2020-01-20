import React from "react";
import Canvas from "./Canvas";
import CustomMoveCtrl from "./CustomMoveCtrl";
import m from "./moveUtil";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./settings";

// initial position
const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];
// winning position
const target = {};

class LevelOne extends React.Component {
  state = { coords: initTriangleShape(x1, y1), dead: false, won: false };

  translate = (triangleCoords, xUnit, yUnit) => {
    let transformedCoords = m.translate(triangleCoords, xUnit, yUnit);
    this.setState({ coords: transformedCoords });
  };

  rotate = (triangleCoords, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(triangleCoords, xUnit, yUnit, deg);
    this.setState({ coords: transformedCoords });
  };

  reflect = (triangleCoords, a, b, c) => {
    let transformedCoords = m.reflect(triangleCoords, a, b, c);
    this.setState({ coords: transformedCoords });
  };
  render() {
    return (
      <div
        className="sans-serif"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <CustomMoveCtrl
          triangleCoords={this.state.coords}
          movement={[this.translate, this.reflect, this.rotate]}
        />
        <Canvas
          triangleCoords={this.state.coords}
          target={target}
          width={SIZE + GRID_MARGIN * 2}
          height={SIZE + GRID_MARGIN * 2}
        />
      </div>
    );
  }
}

export default LevelOne;
