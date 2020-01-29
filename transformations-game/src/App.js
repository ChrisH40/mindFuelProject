import React, { useState } from "react";
import { SIZE, GRID_MARGIN, initTriangleShape } from "./components/settings";
import Canvas from "./components/Canvas";
import CustomMoveCtrl from "./components/CustomMoveCtrl";
import m, { mapToCanvasCoords } from "./components/moveUtil";

const App = () => {
  // --- This becomes part of Level Object/State/Array Package ---
  const [x1, y1] = [GRID_MARGIN, GRID_MARGIN];
  const triangle = initTriangleShape(x1, y1);
  const target = mapToCanvasCoords({ x1: 10, y1: -6, x2: 10, y2: -9, x3: 6, y3: -9 });
  let [current, setCurrent] = useState(triangle);
  let [moving, setMoving ] = useState(false);
  let [coords, setCoords] = useState(triangle);
  let [moves, setMoves] = useState([
    { name: "Translate X-Axis 5, Y-Axis -3", category: "preStage", moveType: "translate", ixt: 5, iyt: -3, style: "translate" },
    { name: "Reflect Y Axis ", category: "preStage", moveType: "reflect", reflectX: 1, reflectY: 0, cre: 0, style: "reflect" },
    { name: "Translate X-Axis 0, Y-Axis -7", category: "preStage", moveType: "translate", ixt: 0, iyt: -7, style: "translate" },
    { name: "Rotate 180° Origin (0, 0) Counter-Clockwise", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: 180, style: "rotate" },
    { name: "Reflect X Axis", category: "preStage", moveType: "reflect", reflectX: 0, reflectY: 1, cre: 0, style: "reflect" },
    { name: "Rotate 90° Origin (0, 0) Clockwise", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: -90, style: "rotate" },
    { name: "Translate X-Axis 0, Y-Axis -9", category: "preStage", moveType: "translate", ixt: 0, iyt: -9, style: "translate" },
    { name: "Translate X-Axis -5, Y-Axis 3", category: "preStage", moveType: "translate", ixt: -5, iyt: 3, style: "translate" },
    { name: "Rotate 270° Origin (0, 0) Clockwise", category: "preStage", moveType: "rotate", ixro: 0, iyro: 0, rotateFactor: -270, style: "rotate" },
  ]);
  let [win, setWin] = useState(false)
  let [lose, setLose] = useState(0);
  // --- ---

  const handleRestart = () => {
    window.location.reload(true);
  };

  const translate = (current, xUnit, yUnit) => {
    let transformedCoords = m.translate(current, xUnit, yUnit);
    setCoords(coords = transformedCoords);
    handleTranslateAnimate(current, coords);
  };

  const rotate = (current, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(current, xUnit, yUnit, deg);
    setCoords(coords = transformedCoords);
    handleRotateAnimate(current, coords, deg);
  };

  const reflect = (current, a, b, c) => {
    let transformedCoords = m.reflect(current, a, b, c);
    setCurrent(current = transformedCoords);
    setCoords(coords = transformedCoords);
    winLoseCheck(current, target);
  };

  const handleTranslateAnimate = (current, destination) => {
    setMoving(true);
    if (current.x1 !== destination.x1 || current.x2 !== destination.x2 || current.x3 !== destination.x3) {
      setCurrent(current);
      setCurrent(current.x1 = (current.x1 < destination.x1 ? current.x1 + 10 : current.x1 - 10));
      setCurrent(current);
      setCurrent(current.x2 = (current.x2 < destination.x2 ? current.x2 + 10 : current.x2 - 10));
      setCurrent(current);
      setCurrent(current.x3 = (current.x3 < destination.x3 ? current.x3 + 10 : current.x3 - 10));
      setCurrent(current);
      setTimeout(() => { handleTranslateAnimate(current, destination) }, 1);
    }
    else if (current.y1 !== destination.y1 || current.y2 !== destination.y2 || current.y3 !== destination.y3) {
      setCurrent(current);
      setCurrent(current.y1 = (current.y1 < destination.y1 ? current.y1 + 10 : current.y1 - 10));
      setCurrent(current);
      setCurrent(current.y2 = (current.y2 < destination.y2 ? current.y2 + 10 : current.y2 - 10));
      setCurrent(current);
      setCurrent(current.y3 = (current.y3 < destination.y3 ? current.y3 + 10 : current.y3 - 10));
      setCurrent(current);
      setTimeout(() => { handleTranslateAnimate(current, destination) }, 1);
    }
    else {
      setCurrent(current = destination);
      setMoving(false);
      winLoseCheck(current, target);  
      return;
    }
  };

  const handleRotateAnimate = (current, destination, deg) => {
    setMoving(true);
    if (current.x1 !== destination.x1 || current.x2 !== destination.x2 || current.x3 !== destination.x3) {
      let rotateDest = m.rotate(current, 0, 0, (deg > 0 ? 90 : -90));
      setCurrent(current);
      setCurrent(current.x1 = rotateDest.x1);
      setCurrent(current.y1 = rotateDest.y1);
      setCurrent(current);
      setCurrent(current.x2 = rotateDest.x2);
      setCurrent(current.y2 = rotateDest.y2);
      setCurrent(current);
      setCurrent(current.x3 = rotateDest.x3);
      setCurrent(current.y3 = rotateDest.y3);
      setCurrent(current);
      setTimeout(() => { handleRotateAnimate(current, destination, deg) }, 750);
    }
    else {
      setCurrent(current = destination);
      setMoving(false);
      winLoseCheck(current, target);
      return;
    }
  };

  // const handleReflectAnimate = (current, destination) => {
  //   if (current.x1 !== destination.x1) {
  //     setCurrent(current);
  //   }
  //   else if (current.y1 !== destination.y1) {
  //     setCurrent(current);
  //   }
  //   winLoseCheck(current, target);
  //   setTimeout(() => { handleReflectAnimate(current, destination) }, 1);
  // };

  const winLoseCheck = (current, exit) => {
    if (JSON.stringify(current) === JSON.stringify(exit)) {
      setWin(true);
    }
    else {
      if (lose === 0 && (current.x1 > 820 || current.x2 > 820 || current.x3 > 820 || current.x1 < 20 || current.x2 < 20 || current.x3 < 20 || current.y1 > 820 || current.y2 > 820 || current.y3 > 820 || current.y1 < 20 || current.y2 < 20 || current.y3 < 20)) {
        setLose(2);
      }
      let movesLeft = moves.find(move => move.category === "preStage");
      if (lose === 0 && movesLeft === undefined) {
        setLose(1);
      }
      else return;
    }
  };

  const PopUp = () => (
    <div className='popup'>
      <div className='popup_inner'>
        <h1
          className={win === true ? "win-font" : "lose-font"}>
          {win === true ? "You Win!" : (lose === 1 ? "You Ran Out Of Moves :(" : "Out Of Bounds!")}
        </h1>
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
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Canvas
            width={SIZE + GRID_MARGIN * 2}
            triangle={triangle}
            target={target}
            current={current}
            setCurrent={setCurrent}
            destination={coords}
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
          moving={moving}
        />
      </div>
      <div>
        {win === true || lose === 1 || lose === 2 ? <PopUp /> : null}
      </div>
    </div>
  )
};

export default App;
