import React, { useState } from "react";
import { withGameContext } from "../game context/context.js";

import { SIZE, GRID_MARGIN, initTriangleShape } from "../data/settings.js";
import levels from "../data/levels.js";

import m, { mapToCanvasCoords } from "../utils/moveUtil.js";
import CustomMoveCtrl from "./CustomMoveCtrl.js";
import TopMenu from "./TopMenu.js";
import { Grid, Exit } from "./Grid.js";
import { Player } from "./Player.js";
import { PopUp } from "./PopUp.js";

import { Stage } from "@inlet/react-pixi";
import "tachyons";

const Game = props => {
  const context = props.gameState;

  const level = levels[context.currentLevel];
  const [moves, setMoves] = useState(level.moves);

  const triangle = initTriangleShape(level.start[0], level.start[1]);
  const target = mapToCanvasCoords(level.target);
  const [current, setCurrent] = useState(triangle);
  const [destination, setDestination] = useState(triangle);

  const [moving, setMoving] = useState(false);
  const [moveX, setMoveX] = useState(false);
  const [moveY, setMoveY] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotationFocal, setRotationFocal] = useState({ x: 420, y: 420 });
  const [reflectionX, setReflectionX] = useState(false);
  const [reflectionY, setReflectionY] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(0);

  // Might change with database. Can possibly store levels in there.
  const handleRestart = () => {
    const lvlMoves = levels[context.currentLevel]["moves"];
    for (let i = 0; i < lvlMoves.length; i++) {
      if (lvlMoves[i]["category"] === "staged") {
        lvlMoves[i]["category"] = "preStage";
      }
    }
    context.setCurrentAttempts(context.currentAttempts + 1);
    context.setCurrentScore(20000);
    context.setInstanceKey(context.instanceKey + 1);
  };

  const translate = (current, xUnit, yUnit) => {
    let transformedCoords = m.translate(current, xUnit, yUnit);
    setDestination(transformedCoords);
    setMoving(true);
    setMoveX(xUnit !== 0 ? true : false);
    setMoveY(yUnit !== 0 ? true : false);
  };

  const rotate = (current, xUnit, yUnit, deg) => {
    let transformedCoords = m.rotate(current, xUnit, yUnit, deg);
    setDestination(transformedCoords);
    setMoving(true);
    setRotation(-deg);
    setRotationFocal(mapToCanvasCoords({ x: xUnit, y: yUnit }));
  };

  const reflect = (current, a, b, c) => {
    let transformedCoords = m.reflect(current, a, b, c);
    setDestination(transformedCoords);
    setMoving(true);
    setReflectionX(a === 1 ? true : false);
    setReflectionY(b === 1 ? true : false);
  };

  const winLoseCheck = (current, exit) => {
    if (JSON.stringify(current) === JSON.stringify(exit)) {
      setWin(true);
    } else {
      if (
        lose === 0 &&
        (current.x1 > 820 ||
          current.x2 > 820 ||
          current.x3 > 820 ||
          current.x1 < 0 ||
          current.x2 < 0 ||
          current.x3 < 0 ||
          current.y1 > 820 ||
          current.y2 > 820 ||
          current.y3 > 820 ||
          current.y1 < 0 ||
          current.y2 < 0 ||
          current.y3 < 0)
      ) {
        setLose(2);
      }
      let movesLeft = moves.find(move => move.category === "preStage");
      if (lose === 0 && movesLeft === undefined) {
        setLose(1);
      } else return;
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${level.theme.backgroundImage})` }}
    >
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
          <Stage
            width={SIZE + GRID_MARGIN * 2}
            height={SIZE + GRID_MARGIN * 2}
            options={{ transparent: true, antialias: true }}
          >
            <Grid
              x={20}
              y={20}
              width={800}
              height={800}
              axis={level.theme.grid.axis}
              border={level.theme.grid.border}
              textColor={level.theme.grid.text}
            />
            <Exit
              target={target}
              line={level.theme.exitLine}
              fill={level.theme.exitFill}
            />
            <Player
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
        {win === true || 
          lose === 1 || 
          lose === 2 ? 
          <PopUp
            handleRestart={handleRestart}
            level={level}
            levels={levels}
            win={win}
            lose={lose} /> : 
          null}
      </div>
    </div>
  );
};

export default withGameContext(Game);
