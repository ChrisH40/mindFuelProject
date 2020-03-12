import React, { useState } from "react";
import { AppContext } from './components/app-context.js';
import { SIZE, GRID_MARGIN, initTriangleShape } from "./components/settings.js";
import CustomMoveCtrl from "./components/CustomMoveCtrl.js";
import TopMenu from './components/TopMenu.js';
import m, { mapToCanvasCoords } from "./components/moveUtil.js";
import levels from "./components/levels.js";
import { Grid, Exit } from "./components/Grid.js";
import { Player } from "./components/Player.js";
import { Stage } from '@inlet/react-pixi';
import "tachyons";


const App = () => {
  const context = React.useContext(AppContext);

  const level = levels[context.currentLevel];

  let triangle = initTriangleShape(level.start[0], level.start[1]);
  let target = mapToCanvasCoords(level.target);
  let [current, setCurrent] = useState(triangle);
  let [destination, setDestination] = useState(triangle);
  const [moving, setMoving] = useState(false);
  const [moveX, setMoveX] = useState(false);
  const [moveY, setMoveY] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotationFocal, setRotationFocal] = useState({ "x": 420, "y": 420 });
  const [reflectionX, setReflectionX] = useState(false);
  const [reflectionY, setReflectionY] = useState(false);

  let [moves, setMoves] = useState(level.moves);

  let [win, setWin] = useState(false)
  let [lose, setLose] = useState(0);

  // Might change with database. Can possibly store levels in there.
  const handleRestart = () => {
    const lvlMoves = levels[context.currentLevel]['moves'];
    for (let i = 0; i < lvlMoves.length; i++) {
      if (lvlMoves[i]['category'] === "staged") {
        lvlMoves[i]['category'] = "preStage";
      }
    }
    context.setCurrentAttempts(context.currentAttempts + 1);
    context.setCurrentScore(20000);
    return context.setInstanceKey(context.instanceKey + 1);
  };

  const handleNextLevel = () => {
    context.setCurrentScore(20000);
    context.setCurrentLevel(context.currentLevel + 1);
    context.setInstanceKey(context.instanceKey + 1);
  };

  const translate = (current, xUnit, yUnit) => {
    let transformedCoords = m.translate(current, xUnit, yUnit);
    setDestination(destination = transformedCoords);
    setMoving(true);
    setMoveX(xUnit !== 0 ? true : false);
    setMoveY(yUnit !== 0 ? true : false);
  };

  const rotate = (current, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(current, xUnit, yUnit, deg);
    setDestination(destination = transformedCoords);
    setMoving(true);
    setRotation(-deg);
    setRotationFocal(mapToCanvasCoords({ "x": xUnit, "y": yUnit }));
  };

  const reflect = (current, a, b, c) => {
    let transformedCoords = m.reflect(current, a, b, c);
    setDestination(destination = transformedCoords);
    setMoving(true);
    setReflectionX(a === 1 ? true : false);
    setReflectionY(b === 1 ? true : false);
  };

  const winLoseCheck = (current, exit) => {
    if (JSON.stringify(current) === JSON.stringify(exit)) {
      setWin(true);
    }
    else {
      if (lose === 0 && (
        current.x1 > 820 || current.x2 > 820 || current.x3 > 820 ||
        current.x1 < 0 || current.x2 < 0 || current.x3 < 0 ||
        current.y1 > 820 || current.y2 > 820 || current.y3 > 820 ||
        current.y1 < 0 || current.y2 < 0 || current.y3 < 0)) {
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
      <div className='popup_inner' style={{ fontFamily: level.theme.font.type }}>
        <h1
          className={win === true ? "win-font" : "lose-font"}>
          {win === true ? level.popUpMessages[0] : (lose === 1 ? level.popUpMessages[1] : level.popUpMessages[2])}
        </h1>
        <button className="restart-button" onClick={() => handleRestart()}>Play Again?</button>
        {win === true && context.currentLevel + 1 < levels.length ? <button className="next-level-button" onClick={() => handleNextLevel()}> Next Level! </button> : null}
      </div>
    </div>
  );

  return (
    <div className="App" style={{ backgroundImage: `url(${level.theme.backgroundImage})` }}>
      <div className="Canvas">
      <div className="menu-container">
        <TopMenu
          title={level.theme.levelTitle}
          menuBackground={level.theme.menuContainerBackground}
          font={level.theme.font}
        />
      </div>
      <div
          className="sans-serif"
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Stage width={SIZE + GRID_MARGIN * 2} height={SIZE + GRID_MARGIN * 2} options={{ transparent: true, antialias: true }}>
            <Grid
              x={20}
              y={20}
              width={800}
              height={800}
              axis={level.theme.grid.axis}
              border={level.theme.grid.border}
              textColor={level.theme.grid.text} />
            <Exit
              target={target}
              line={level.theme.exitLine}
              fill={level.theme.exitFill} />
            < Player
              line={level.theme.playerLine}
              fill={level.theme.playerFill}
              start={triangle}
              current={current}
              setCurrent={setCurrent}
              destination={destination}
              moving={moving}
              setMoving={setMoving}
              moveX={moveX}
              setMoveX={setMoveX}
              moveY={moveY}
              setMoveY={setMoveY}
              rotation={rotation}
              setRotation={setRotation}
              rotationFocal={rotationFocal}
              reflectionX={reflectionX}
              setReflectionX={setReflectionX}
              reflectionY={reflectionY}
              setReflectionY={setReflectionY}
              target={target}
              win={win}
              lose={lose}
              winLoseCheck={winLoseCheck}
            />
          </Stage>
        </div>
      </div>
      <div className="right-container">
        <CustomMoveCtrl
          handleRestart={handleRestart}
          destination={destination}
          movement={[translate, reflect, rotate]}
          moves={moves}
          setMoves={setMoves}
          moving={moving}
          topBackground={level.theme.topContainerBackground}
          botBackground={level.theme.botContainerBackground}
          moveColour={level.theme.moveColour}
          font={level.theme.font}
        />
      </div>
      <div>
        {win === true || lose === 1 || lose === 2 ? <PopUp /> : null}
      </div>
    </div>
  )
};

export default App;

