import React from "react";
import Canvas from "./Canvas";
import CustomMoveCtrl from "./CustomMoveCtrl";
import m from "./moveUtil";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./settings";

// initial position
const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];

class LevelOne extends React.Component {
  // winning position
  static defaultProps = {
    target: { x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 }
  };

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
          target={this.props.target}
          width={SIZE + GRID_MARGIN * 2}
        />
      </div>
    );
  }
}

export default LevelOne;
