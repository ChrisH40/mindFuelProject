
const levels = [

    {
        level: 1,
        start: [20, 20],
        target: { x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 },
        moves: [
            { id: 1, name: "(5, -3)", category: "preStage", moveType: "translate", ixt: 5, iyt: -3, style: "translate" },
            { id: 2, name: "", category: "preStage", moveType: "reflect", reflectX: 1, reflectY: 0, cre: 0, style: "reflect-y" },
            { id: 3, name: "(0, -7)", category: "preStage", moveType: "translate", ixt: 0, iyt: -7, style: "translate" },
            { id: 4, name: "180°", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: 180, style: "rotate-counter" },
            { id: 5, name: "", category: "preStage", moveType: "reflect", reflectX: 0, reflectY: 1, cre: 0, style: "reflect-x" },
            { id: 6, name: "90°", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: -90, style: "rotate-clock" },
            { id: 7, name: "(0, -9)", category: "preStage", moveType: "translate", ixt: 0, iyt: -9, style: "translate" },
            { id: 8, name: "(-5, 3)", category: "preStage", moveType: "translate", ixt: -5, iyt: 3, style: "translate" },
            { id: 9, name: "270°", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: -270, style: "rotate-clock" },
        ],
        obstacles: []
    },
]

export default levels


















// --- May become placeholder for Level Object/State/Array Packages ---

// import React from "react";
// import Canvas from "./Canvas";
// import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./settings";

// class LevelOne extends React.Component {

//   // winning position
//   static defaultProps = {
//     target: { x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 }
//   };

//   render() {
//     return (
//       <div
//         className="sans-serif"
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)"
//         }}
//       >
//         <Canvas
//           triangleCoords={this.props.triangleCoords}
//           target={this.props.target}
//           width={SIZE + GRID_MARGIN * 2}
//           win={this.props.win}
//           lose={this.props.lose}
//         />
//       </div>
//     );
//   }
// }

// export default LevelOne;
