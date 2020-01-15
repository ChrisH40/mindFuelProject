import React, { useState, useEffect, useRef } from "react";
import u from "./utility";
import { SIZE, GRID_MARGIN, DIMENSION, triangle_shape } from "./settings";

const unit = Math.floor(SIZE / DIMENSION);

const unsupportedMsg = (
  <div>Please switch to browser that supports canvas API</div>
);

const drawGrid = ctx => {
  u.drawGrid(ctx);
  u.drawAxis(ctx);
};

const drawTriangle = (iX, iY, ctx) => {
  const args = { ...triangle_shape(iX, iY), ctx };
  u.drawTriangle(args);
};
const Canvas = () => {
  const [x, setX] = useState(GRID_MARGIN);
  const [y, setY] = useState(GRID_MARGIN + (unit * DIMENSION) / 2 - unit * 3);
  const canvasEl = useRef(null);

  useEffect(() => {
    // check if the browser supports canvas
    if (canvasEl.current.getContext) {
      var ctx = canvasEl.current.getContext("2d");
      // draw a 10 x 10 (by default) grid
      drawGrid(ctx);
      drawTriangle(x, y, ctx);
    }
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasEl}
      width={`${SIZE + GRID_MARGIN * 2}px`}
      height={`${SIZE + GRID_MARGIN * 2}px`}
      style={{
        /*background: "aquamarine",*/ border: "1px solid black",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      {unsupportedMsg}
    </canvas>
  );
};

export default Canvas;
